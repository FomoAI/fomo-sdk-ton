import { configDotenv } from "dotenv";
import {
  createJettonDeployMessage,
  createMempumpMasterFromInit,
  hashFromBoc,
  sleep,
  waitUntilWalletSeqnoChanges,
} from "./helpers/jettonHelpers";
import { ApiService } from "./helpers/ApiService";
import { EQueueStatus } from "./constants";
import { createTonClient, createWallet } from "./helpers/tonClient";
import { IJettonParams } from "./types/transaction";

configDotenv();

export const createJetton = async (jettonParams: IJettonParams, preBuy?: string) => {
  const client = createTonClient();

  const { wallet, keyPair } = await createWallet();
  const userWallet = client.open(wallet);

  const seqno = await userWallet.getSeqno();
  console.log("User Wallet Address:", userWallet.address, "Seqno:", seqno);

  const { mempumpMaster, memepumpInit } = await createMempumpMasterFromInit(
    client,
    userWallet,
    jettonParams
  );
  const transfer = createJettonDeployMessage(
    seqno,
    keyPair,
    mempumpMaster,
    memepumpInit,
    userWallet,
    preBuy
  );

  const hash = await hashFromBoc(transfer.toBoc().toString("base64"));
  console.log("Hash:", hash);
  console.log("Memepump Address:", mempumpMaster.address.toRawString());

  await userWallet.send(transfer);
  await waitUntilWalletSeqnoChanges(userWallet, seqno);

  // API Service
  const apiService = new ApiService();
  const createTokenResponse = await apiService.createToken({
    name: jettonParams.name,
    ticker: jettonParams.symbol,
    token_address: mempumpMaster.address.toRawString(),
    image_url: jettonParams.image,
    description: jettonParams.description,
    version: "v2",
  });

  const checkQueueStatus = async () => {
    console.log("Checking token on API...");
    const queueRes = await apiService.queueStatus(createTokenResponse.idKey);
    const status = queueRes.status;
    if (status === EQueueStatus.AWAIT) {
      await sleep(10000);
      await checkQueueStatus();
    } else if (status === EQueueStatus.ERROR) {
      console.log("Error on API side");
    } else {
      console.log("Token successfully created on API side");
    }
  };
  await checkQueueStatus();
  return {
    tokenId: createTokenResponse.idKey,
    tokenAddress: mempumpMaster.address.toRawString(),
  };
};
