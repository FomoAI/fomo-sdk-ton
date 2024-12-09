import { buyJetton } from "./buyJetton";
import { createJetton } from "./createJetton";
import { getJettonBalance } from "./jettonBalance";
import { sellJetton } from "./sellJetton";

const jettonParams = {
  name: "48Mem Token",
  description: `Wrapped version of Mem Token created at ${Date.now()}`,
  symbol: "MTW",
  image:
    "https://ucarecdn.com/8144db2c-21ea-4b20-8d72-a636aaf164d1/wrapped-bitcoin.png",
};

// const jettonAddress = "kQCp7NPVXaNM0J7tKJLlcagakU1FZn_6ov_B403na42HOOgu";

const start = async () => {
  //   Create Jetton
  const TON_PRE_BUY = "0.1";
  const data = await createJetton(jettonParams, TON_PRE_BUY);
  console.log("New Jetton: ", data);
  // ------------------------------------------------------------
  //   Buy this Jetton
  const tonAmount = "0.1"; // 0.1 TON
  const buyData = await buyJetton(data.tokenAddress, tonAmount);
  console.log("Buy Data: ", buyData);
  // ------------------------------------------------------------
  //   Get My Jetton Balance
  const jettonBalance = await getJettonBalance(data.tokenAddress);
  console.log("Jetton Balance: ", jettonBalance);
  // ------------------------------------------------------------
  //   Sell 100% of this Jetton
  const sellData = await sellJetton(data.tokenAddress, jettonBalance);
  console.log("Sell Data: ", sellData);
  // ------------------------------------------------------------
};

start();
