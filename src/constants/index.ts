import { toNano } from "@ton/core";
import { configDotenv } from "dotenv";
configDotenv();
export const maxMarketCap = 20000;

export const isTestnet = process.env.IS_TESTNET === "true";
export const tonCenterApiKey = process.env.TON_CENTER_API_KEY;
export const apiUrl = process.env.API_URL || "https://appipa.fomo.fund";

export enum EPurchaseStep {
  CONFIRMING = "confirm",
  AWAITING = "awaiting",
  SUCCESS = "success",
  ERROR = "error",
}

export enum EActionType {
  BUY = "buy",
  SELL = "sell",
}

export enum ELeaderboardTab {
  HOLDERS = "holders",
  BUY = "buy",
  SELL = "sell",
}

export const leaderboardTabsDictionary = {
  [ELeaderboardTab.HOLDERS]: "Holders",
  [ELeaderboardTab.BUY]: "Buy",
  [ELeaderboardTab.SELL]: "Sell",
};

export const TON_VIEWER_URL = isTestnet
  ? "https://testnet.tonviewer.com"
  : "https://tonviewer.com";

export const EProfileTabs = {
  INVESTMENTS: "investments",
  CREATED: "created",
};

export const SELL_TON_COMMISSION = 0.16;

export const initTONFomo = isTestnet ? toNano("1.25") : toNano("2000");
export const initTokenFomo = isTestnet
  ? toNano("900000000")
  : toNano("800000000");

export enum EQueueStatus {
  AWAIT = "await",
  SUCCESS = "success",
  ERROR = "error",
}

export enum ECreateTokenFormSteps {
  INITIAL = "initial",
  CONFIRM_INITIAL = "confirmInitial",
  PRE_BUY = "preBuy",
  SUCCESS = "success",
  ERROR = "error",
}

export const maxClicksPerDay = 100;

export enum ETaskGroup {
  SOCIALS = "social",
  TRANSACTION = "transaction",
  FRIEND = "friend",
  NANO_FOMO = "nanoFomo",
  TRUST = "trust",
  PARTNER = "partner",
  OTHER = "other",
}

export const taskGroupsColorDictionary = {
  [ETaskGroup.TRANSACTION]: "#253BF8B2",
  [ETaskGroup.SOCIALS]: "#1E1D1D",
  [ETaskGroup.TRUST]: "#1E1D1D",
  [ETaskGroup.NANO_FOMO]: "#1E1D1D",
  [ETaskGroup.FRIEND]: "#1E1D1D",
  [ETaskGroup.OTHER]: "#1E1D1D",
  [ETaskGroup.PARTNER]: "#1E1D1D",
};

export const taskGroupsTitleDictionary = {
  [ETaskGroup.PARTNER]: "Partners",
  [ETaskGroup.SOCIALS]: "Follows",
  [ETaskGroup.FRIEND]: "Friends",
  [ETaskGroup.TRANSACTION]: "Trading",
  [ETaskGroup.NANO_FOMO]: "Nano FOMO",
  [ETaskGroup.TRUST]: "NFT",
  [ETaskGroup.OTHER]: "Others",
};

export enum EChartType {
  LITE = "lite",
  PRO = "pro",
}

export const isBrowserApp = true;

export const AUTH_KEY = "auth_key";
export const BEARER_AUTH_KEY = "bearer_auth_key";
export const BEARER_DEADLINE_KEY = "bearer_deadline_key";

export enum EWalletType {
  "okxTonWallet" = "okxTonWallet",
  "tonWallet" = "tonWallet",
}