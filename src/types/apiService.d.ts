import { IChartData } from './stats'
import { ITask } from './task'
import { IToken } from './token'
import { ITransaction } from './transaction'
import { IUserInfo } from './user'

export interface GenericApiResponse<T> {
  status: string
  data: T
}

export interface ProfileResponse {
  _id: string
  id: string
  is_bot: boolean
  first_name: string
  last_name: string
  username: string
  language_code: string
  nickname: string
  photo: string
  createdAt: string
  updatedAt: string
  __v: number
  ton_address: string[]
  ref?: string
  isOgPass: boolean
  ogPassPending: boolean
  points: {
    $numberDecimal: string
  }
  tonTotalTransaction: {
    $numberDecimal: string
  }
  q: number
  tap: number
  quantity: number
  isOkxWallet?: boolean
}

export interface ITokensResponse extends IPageInfo {
  docs: IToken[]
}

export interface ITransactionsResponse extends IPageInfo {
  docs: ITransaction[]
}

export interface ILeaderboardData {
  customer: IUserInfo
  amount: string
}

export interface ILeaderboardDataV2 {
  friendsCount: number
  nickname: string
  photo: string
  _id: string
}

export interface ILeaderboardResponse {
  buy: ILeaderboardData[]
  sell: ILeaderboardData[]
  holders: ILeaderboardData[]
}

export interface ITokenHolder {
  customer: ProfileResponse
  holdsToken: string
}
export interface ITokenHoldersResponse extends IPageInfo {
  docs: ITokenHolder[]
  token: IToken
  totalHolders: number
}

export interface IGetTasksResponse {
  docs: ITask[]
}

export interface IPageInfo {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface ICountdown {
  deadline: number
}

interface CustomerPoints {
  $numberDecimal: string
}

export interface ICustomer {
  _id: string
  id: string
  is_bot: boolean
  first_name: string
  username: string
  language_code: string
  is_premium: boolean
  nickname: string
  photo: string
  createdAt: string
  updatedAt: string
  __v: number
  ton_address: string[]
  ref: string
  points: CustomerPoints
  tonTotalTransaction: CustomerPoints
}
export interface IReferral {
  _id: string
  customer: ICustomer
  description: string
  point: CustomerPoints
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ICheckRewardResponse {
  customer: string
  count: number
  last: string
  status: 'pending' | 'claim'
}

export interface IBalanceByCategoriesResponse {
  ref?: string
  reward?: string
  task?: string
  total?: string
  game?: string
}

export interface IMyRefsResponse {
  child: IUserInfo
  createdAt: string
  parent: string
  referralType: string
  _id: string
}

export interface IProgressResponse {
  next: number
  position: number
  customer: ICustomer
  friendsCount: number
  outOf: number
}

export interface IChartData {
  value: string
  time: string
}

export interface IChartProData {
  high: number
  low: number
  open: number
  close: number
  time: string | number
}
export interface IUserBet {
  balance: {
    $numberDecimal: number | string
  }
  targetIndex: number
  userBet: string
  xPos: string
}

export interface IMonitorData {
  priceTon: string
  priceUsd: null
  mktcap: string
  liquidity: string
  tonCollected: string
  txnsCount: string
  volumeCount: string
  makersCount: string
  TXNS: { buy: string; sell: string }
  VOLUME: { buy: string; sell: string }
  MAKERS: { buy: string; sell: string }
  pricePercentage: string[]
}
