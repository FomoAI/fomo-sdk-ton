import { isTestnet } from "../constants/index";
import { sleep } from "./jettonHelpers";

export const getBodyToMsgHash = async (body_hash: string): Promise<string> => {
  let isSuccess = false;
  let transactions;
  while (!isSuccess) {
    console.log("Wait for get MsgHash...");
    const tx = await getTx(body_hash);
    if (tx.length > 0) {
      transactions = await getTx(body_hash);
      if (transactions.length > 0) {
        isSuccess = true;
      }
    }
    sleep(5000);
  }
  return transactions[0].in_msg.hash as string;
};

const getTx = async (body_hash: string) => {
  const url = `https://${
    isTestnet ? "testnet." : ""
  }toncenter.com/api/v3/transactionsByMessage?body_hash=${body_hash}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.transactions;
};
