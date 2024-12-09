import { configDotenv } from "dotenv";
import { createTonClient, createWallet } from "./helpers/tonClient";
import { Address, TupleBuilder } from "@ton/core";
import { createMempumpMasterFromAddress } from "./helpers/jettonHelpers";
import { JettonWallet } from "./contract/JettonWalletBase";
configDotenv();

export const getJettonBalance = async (tokenAddress: string) => {
  const client = createTonClient();

  const { wallet } = await createWallet();
  const userWallet = client.open(wallet);

  const args = new TupleBuilder();
  args.writeAddress(userWallet.address);

  const { mempumpMaster } = await createMempumpMasterFromAddress(
    client,
    tokenAddress
  );

  const walletAddress = await mempumpMaster.getGetWalletAddress(
    userWallet.address
  );

  const walletJetton = JettonWallet.createFromAddress(walletAddress);
  const jettonWalletAddress = walletJetton.address;

  const balanceResponse = await client.runMethod(
    jettonWalletAddress,
    "get_wallet_data"
  );

  return balanceResponse.stack.readBigNumber();
};
