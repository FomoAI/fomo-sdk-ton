import { configDotenv } from "dotenv";
import {
  createBuyMessage,
  createMempumpMasterFromAddress,
  createSellMessage,
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

export const sellJetton = async (
  tokenAddress: string,
  jettonAmount: bigint
) => {
  const client = createTonClient();

  const { wallet, keyPair } = await createWallet();
  const userWallet = client.open(wallet);

  const seqno = await userWallet.getSeqno();
  console.log("User Wallet Address:", userWallet.address, "Seqno:", seqno);

  const { mempumpMaster, memepumpInit } = await createMempumpMasterFromAddress(
    client,
    tokenAddress
  );
  const transfer = await createSellMessage(
    seqno,
    keyPair,
    mempumpMaster,
    memepumpInit,
    userWallet,
    jettonAmount
  );

  const bodyHash = await hashFromBoc(transfer.toBoc().toString("base64"));
  console.log("Hash:", bodyHash);
  console.log("Memepump Address:", mempumpMaster.address.toRawString());

  await userWallet.send(transfer);
  await waitUntilWalletSeqnoChanges(userWallet, seqno);

  const msgHashBase64 = await getBodyToMsgHash(bodyHash);
  const msgHash = base64ToHex(msgHashBase64);
  console.log("Msg Hash:", msgHash);


  // API Service
    const apiService = new ApiService();

    const tonAmount = await getReceivedTokenV2({
      action: EActionType.SELL,
      contractAddress: tokenAddress,
      amount: jettonAmount.toString(),
    });

    let status;
    const actionRes = await apiService.saveTransaction({
      type: EActionType.SELL,
      token_address: tokenAddress,
      txHash: msgHash,
      jettonAmount: jettonAmount.toString(),
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
        console.log(`Sell for ${jettonAmount} JETTONS was successful`);
        console.log(`You got ${tonAmount} TON`);
      }
    };
    await checkStatus();
    return {
      txId: actionRes.idKey,
      tokenAddress,
    };
};
