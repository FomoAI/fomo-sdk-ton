// tonClient.js
import { TonClient } from "@ton/ton";
import { tonCenterApiKey, isTestnet } from "../constants";
import { WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";

export const createTonClient = () => {
  return new TonClient({
    endpoint: `https://${
      isTestnet ? "testnet." : ""
    }toncenter.com/api/v2/jsonRPC`,
    apiKey: tonCenterApiKey,
  });
};

export const createWallet = async () => {
  const mnemonicStr = process.env.WALLET_MNEMONIC || "";
  const mnemonicArray = mnemonicStr.split(" ");
  const keyPair = await mnemonicToPrivateKey(mnemonicArray);

  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });

  return { wallet, keyPair };
};
