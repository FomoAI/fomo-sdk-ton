import { Sha256 } from "@aws-crypto/sha256-js";
import {
  Dictionary,
  beginCell,
  Cell,
  Address,
  OpenedContract,
  internal,
  toNano,
  TupleBuilder,
  fromNano,
} from "@ton/core";
import { TonClient, WalletContractV4 } from "@ton/ton";
import { Buffer } from "buffer";
import {
  MempumpMaster,
  storeBuy,
  storeTokenBurn,
} from "../contract/tact_MempumpMaster";
import { KeyPair } from "@ton/crypto";
import { IJettonParams } from "../types/transaction";
import { createTonClient } from "./tonClient";
import { EActionType } from "../constants";
const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor(1023 - 8 / 8);

const sha256 = (str: string) => {
  const sha = new Sha256();
  sha.update(str);
  return Buffer.from(sha.digestSync());
};

const toKey = (key: string) => {
  return BigInt(`0x${sha256(key).toString("hex")}`);
};

export async function hashFromBoc(boc: string) {
  const inMsgCell = Cell.fromBase64(boc);
  const inMsgHash = inMsgCell.hash();
  const inMsgHashHex = inMsgHash.toString("hex");
  return inMsgHashHex;
}

export function buildOnchainMetadata(data: {
  name: string;
  description: string;
  image: string;
}): Cell {
  let dict = Dictionary.empty(
    Dictionary.Keys.BigUint(256),
    Dictionary.Values.Cell()
  );

  // Store the on-chain metadata in the dictionary
  Object.entries(data).forEach(([key, value]) => {
    dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
  });

  return beginCell()
    .storeInt(ONCHAIN_CONTENT_PREFIX, 8)
    .storeDict(dict)
    .endCell();
}

export function makeSnakeCell(data: Buffer) {
  // Create a cell that package the data
  let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);

  const b = chunks.reduceRight((curCell, chunk, index) => {
    if (index === 0) {
      curCell.storeInt(SNAKE_PREFIX, 8);
    }
    curCell.storeBuffer(chunk);
    if (index > 0) {
      const cell = curCell.endCell();
      return beginCell().storeRef(cell);
    } else {
      return curCell;
    }
  }, beginCell());
  return b.endCell();
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
  let chunks: Buffer[] = [];
  while (buff.byteLength > 0) {
    chunks.push(buff.slice(0, chunkSize));
    buff = buff.slice(chunkSize);
  }
  return chunks;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function waitUntilWalletSeqnoChanges(
  walletContract: any,
  initialSeqno: number
) {
  let currentSeqno = initialSeqno;
  while (currentSeqno === initialSeqno) {
    console.log("Waiting for wallet seqno to be changed...");
    await sleep(5000);
    currentSeqno = await walletContract.getSeqno();
  }
}

export async function prepareJettonData(jettonParams: IJettonParams) {
  return {
    wrapped: buildOnchainMetadata({
      ...jettonParams,
      name: jettonParams.name + " Wrapped",
    }),
    unwrapped: buildOnchainMetadata(jettonParams),
  };
}

export const createMempumpMasterFromInit = async (
  client: TonClient,
  userWallet: OpenedContract<WalletContractV4>,
  jettonParams: IJettonParams
) => {
  const jettonData = await prepareJettonData(jettonParams);
  let memepumpInit;
  memepumpInit = await MempumpMaster.fromInit(
    userWallet.address,
    userWallet.address,
    jettonData.wrapped,
    jettonData.unwrapped
  );

  const mempumpMaster = client.open(memepumpInit);

  return { mempumpMaster, memepumpInit };
};

export const createMempumpMasterFromAddress = async (
  client: TonClient,
  tokenAddress: string
) => {
  let memepumpInit;
  memepumpInit = MempumpMaster.fromAddress(Address.parse(tokenAddress));

  const mempumpMaster = client.open(memepumpInit);

  return { mempumpMaster, memepumpInit };
};

export const calculateBuyValue = (
  // TON amount
  amount: string,
  TON_liquidity: bigint,
  token_liquidity: bigint,
  constant_product: bigint
) => {
  if (!amount) return 0n;
  return token_liquidity - constant_product / (TON_liquidity + toNano(amount));
};

export const calculateSellValue = (
  amount: string,
  TON_liquidity: bigint,
  token_liquidity: bigint,
  constant_product: bigint
) => {
  return TON_liquidity - constant_product / (token_liquidity + toNano(amount));
};

export function calcBuyTonAmount(desiredTonAmount: bigint): bigint {
  return BigInt(Math.round(Number(desiredTonAmount) / 0.99)) + toNano("0.12");
}

export const getFomoData = async (contractAddress: string) => {
  const args = new TupleBuilder();
  const result = await createTonClient().runMethod(
    Address.parse(contractAddress),
    "get_fomo_data",
    args.build()
  );
  // @ts-nocheck
  const tradeStatus = result.stack.readBigNumber();
  const curveBalance = result.stack.readBigNumber();
  const commissionBalance = result.stack.readBigNumber();
  const commissionTotal = result.stack.readBigNumber();
  const commission = result.stack.readBigNumber();
  const mathScale = result.stack.readBigNumber();
  const coinScale = result.stack.readBigNumber();
  const virtualTON = result.stack.readBigNumber();
  const virtualJetton = result.stack.readBigNumber();
  const curveMaxSupply = result.stack.readBigNumber();
  const curveJettonStock = result.stack.readBigNumber();
  const curveJettonSold = result.stack.readBigNumber();
  const maxTonAmount = result.stack.readBigNumber();
  const dexFeeAmount = result.stack.readBigNumber();
  const airdropAmount = result.stack.readBigNumber();
  const airdropMinted = result.stack.readBigNumber();
  const price = result.stack.readBigNumber();
  const jettonsInStock = result.stack.readBigNumber();
  return {
    token_liquidity: virtualJetton - curveJettonSold,
    TON_liquidity: virtualTON + curveBalance,
    constant_product: virtualJetton * virtualTON,
    tradeStatus,
    curveBalance,
    commissionBalance,
    commissionTotal,
    commission,
    mathScale,
    coinScale,
    virtualTON,
    virtualJetton,
    curveMaxSupply,
    curveJettonStock,
    maxTonAmount,
    dexFeeAmount,
    airdropAmount,
    airdropMinted,
    price,
    jettonsInStock,
    curveJettonSold,
  };
};

export const getReceivedTokenV2 = async ({
  action,
  contractAddress,
  amount,
}: {
  action: EActionType;
  contractAddress: string;
  amount: string;
}) => {
  try {
    // Получаем данные о ликвидности
    const liquidity = await getFomoData(contractAddress);

    // Рассчитываем значение в зависимости от действия (покупка или продажа)
    const calculatedValue =
      action === EActionType.BUY
        ? calculateBuyValue(
            amount,
            liquidity.TON_liquidity,
            liquidity.token_liquidity,
            liquidity.constant_product
          )
        : calculateSellValue(
            amount,
            liquidity.TON_liquidity,
            liquidity.token_liquidity,
            liquidity.constant_product
          );

    return fromNano(calculatedValue);
  } catch (error) {
    console.error("Error calculating received token value:", error);
    return "";
  }
};

export const createJettonDeployMessage = (
  seqno: number,
  keyPair: KeyPair,
  mempumpMaster: OpenedContract<MempumpMaster>,
  memepumpInit: MempumpMaster,
  wallet: OpenedContract<WalletContractV4>,
  preBuy?: string
) => {
  const msg_body = beginCell()
    .store(
      storeBuy({
        $$type: "Buy",
        doBuy: Boolean(preBuy),
      })
    )
    .endCell();

  const calculatedTonAmount =
    BigInt(Math.round(Number(preBuy) / 0.99)) + toNano("0.12");

  return wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        value: calculatedTonAmount,
        to: mempumpMaster.address,
        body: msg_body,
        init: memepumpInit.init,
      }),
    ],
  });
};

export const createBuyMessage = (
  seqno: number,
  keyPair: KeyPair,
  mempumpMaster: OpenedContract<MempumpMaster>,
  memepumpInit: MempumpMaster,
  wallet: OpenedContract<WalletContractV4>,
  value: string
) => {
  const msg_body = beginCell()
    .store(
      storeBuy({
        $$type: "Buy",
        doBuy: true,
      })
    )
    .endCell();

  return wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        value: calcBuyTonAmount(toNano(value)),
        to: mempumpMaster.address,
        body: msg_body,
      }),
    ],
  });
};

export const createSellMessage = async (
  seqno: number,
  keyPair: KeyPair,
  mempumpMaster: OpenedContract<MempumpMaster>,
  memepumpInit: MempumpMaster,
  wallet: OpenedContract<WalletContractV4>,
  jettonAmount: bigint
) => {
  const walletAddress = await mempumpMaster.getGetWalletAddress(wallet.address);
  const msg_body = beginCell()
    .store(
      storeTokenBurn({
        $$type: "TokenBurn",
        amount: jettonAmount,
        owner: walletAddress,
        queryId: 0n,
        response_destination: wallet.address,
      })
    )
    .endCell();

  return wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [
      internal({
        value: "0.16",
        to: walletAddress,
        body: msg_body,
      }),
    ],
  });
};
