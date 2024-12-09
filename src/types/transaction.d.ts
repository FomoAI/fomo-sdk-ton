import { EActionType } from '../constants'
import { ProfileResponse } from './apiService'
import { IToken } from './token'
import { IUserInfo } from './user'

export interface ITransaction {
  tonAmount: string
  jettonAmount: string
  createdAt?: string
  customer: IUserInfo
  senderRaw: string
  ticker: string
  txHash?: string
  type: EActionType
  _id?: string
}

export interface ILastTransaction extends ITransaction {
  destRaw: string
  feeTonAmount: { $numberDecimal: string }
  jettonAmount: { $numberDecimal: string }
  customer: ProfileResponse | null
  tonAmount: { $numberDecimal: string }
  price: { $numberDecimal: string }
  token: IToken
  ts: string
  type: 'buy' | 'sell'
}

export interface IJettonParams {
  name: string
  description: string
  image: string
  symbol: string
}
