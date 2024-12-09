import { configDotenv } from "dotenv";
import {
  createBuyMessage,
  createMempumpMasterFromAddress,
  getReceivedTokenV2,
  hashFromBoc,
  sleep,
  waitUntilWalletSeqnoChanges,
} from "./helpers/jettonHelpers";
import { ApiService } from "./helpers/ApiService";
import { EActionType, EQueueStatus } from "./constants";
import { createTonClient, createWallet } from "./helpers/tonClient";
import { getBodyToMsgHash } from "./helpers/bodyToMsgHash";
import { base64ToHex } from "./helpers/txToBase64";

configDotenv();

export const buyJetton = async (tokenAddress: string, tonAmount: string) => {
  const client = createTonClient();

  const { wallet, keyPair } = await createWallet();
  const userWallet = client.open(wallet);

  const seqno = await userWallet.getSeqno();
  console.log("User Wallet Address:", userWallet.address, "Seqno:", seqno);

  const { mempumpMaster, memepumpInit } = await createMempumpMasterFromAddress(
    client,
    tokenAddress
  );
  const transfer = createBuyMessage(
    seqno,
    keyPair,
    mempumpMaster,
    memepumpInit,
    userWallet,
    tonAmount
  );

  const bodyHash = await hashFromBoc(transfer.toBoc().toString("base64"));
  console.log("Body Hash:", bodyHash);
  console.log("Memepump Address:", mempumpMaster.address.toRawString());

  await userWallet.send(transfer);
  await waitUntilWalletSeqnoChanges(userWallet, seqno);

  const msgHashBase64 = await getBodyToMsgHash(bodyHash);
  const msgHash = base64ToHex(msgHashBase64);
  console.log("Msg Hash:", msgHash);

  // API Service
  const apiService = new ApiService();

  const jettonAmount = await getReceivedTokenV2({
    action: EActionType.BUY,
    contractAddress: tokenAddress,
    amount: tonAmount,
  });

  let status;
  const actionRes = await apiService.saveTransaction({
    type: EActionType.BUY,
    token_address: tokenAddress,
    txHash: msgHash,
    jettonAmount,
    tonAmount,
    version: "v2",
  });
  const checkStatus = async () => {
    const statusRes = await apiService.queueStatus(actionRes.idKey);
    status = statusRes.status;
    console.log("Checking res is: ", statusRes.status);
    if (status === EQueueStatus.AWAIT) {
      await sleep(10000);
      await checkStatus();
    } else {
      console.log(`Buy for ${tonAmount} TON was successful`);
      console.log(`You got ${jettonAmount} Jettons`);
    }
  };
  await checkStatus();
  return {
    txId: actionRes.idKey,
    tokenAddress,
  };
};
