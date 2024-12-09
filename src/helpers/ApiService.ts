import axios, { AxiosInstance } from 'axios'
import {
  apiUrl,
  EActionType,
  EQueueStatus,
  EWalletType,
  isBrowserApp,
} from '../constants'
import {
  GenericApiResponse,
  IBalanceByCategoriesResponse,
  IChartData,
  IChartProData,
  ICheckRewardResponse,
  ICountdown,
  IGetTasksResponse,
  ILeaderboardDataV2,
  ILeaderboardResponse,
  IMonitorData,
  IMyRefsResponse,
  IProgressResponse,
  IReferral,
  ITokenHoldersResponse,
  ITokensResponse,
  ITransactionsResponse,
  IUserBet,
  ProfileResponse,
} from '../types/apiService'
import { delay } from './delay'

import { ILastTransaction } from '../types/transaction'
import { configDotenv } from 'dotenv';
configDotenv();

export class ApiService {
  instance: AxiosInstance
  constructor(
    id?: number | string | null,
    tg?: string,
    bearer?: string | null
  ) {
    this.instance = axios.create({
      baseURL: apiUrl,
      headers: {
        at: id,
        Authorization: bearer
          ? `Bearer ` + bearer
          : undefined,
        // Bearer: '',
      },
    })
  }

  private async retryRequest<T>(
    request: () => Promise<T>
  ): Promise<T> {
    while (true) {
      try {
        return await request()
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status &&
          error.response?.status >= 500
        ) {
          await delay(3000)
        } else {
          throw error
        }
      }
    }
  }

  async addWallet(
    walletAddress: string,
    walletType: EWalletType,
    // proof?: TonProofItemReply,
    // account?: Account | OkxAccount
  ) {
    const response = await this.instance.post<
      GenericApiResponse<{ access_token: string }>
    >('/v1/profile/add_wallet', {
      address: walletAddress,
    //   proof,
    //   account,
      wallet_type: walletType,
    })
    return response.data?.data
  }

  async getProfile() {
    return this.retryRequest(async () => {
      const response =
        await this.instance.get<
          GenericApiResponse<ProfileResponse>
        >('/v1/profile')
      return response.data?.data
    })
  }

  async getUsers() {
    const response = await this.instance.get<
      GenericApiResponse<{ users: number }>
    >('/v1/stat/users')
    return response.data?.data
  }

  async getDeadline() {
    const response =
      await this.instance.get<
        GenericApiResponse<ICountdown>
      >('/v1/countdown')
    return response.data?.data
  }

  async getPointsHistory() {
    const response =
      await this.instance.get<
        GenericApiResponse<{ docs: IReferral[] }>
      >('/v1/point')
    return response.data?.data
  }

  async uploadImage(base64: string) {
    const response = await this.instance.post<
      GenericApiResponse<{ url: string }>
    >('/v1/image/upload', {
      base64,
    })
    if (response.status !== 201) {
      throw new Error('Upload image error')
    }
    return response.data?.data
  }

  async createToken({
    name,
    ticker,
    token_address,
    image_url,
    market_cap,
    tg_channel_link,
    tg_chat_link,
    description,
    unwrapped_jetton_master_address,
    version = 'v1',
  }: {
    name: string
    ticker: string
    token_address: string
    image_url: string
    market_cap?: string
    tg_channel_link?: string
    tg_chat_link?: string
    description?: string
    unwrapped_jetton_master_address?: string
    version?: 'v1' | 'v2'
  }) {
    const response = await this.instance.post<
      GenericApiResponse<{ idKey: string }>
    >(`/${version}/token/create_token`, {
      name,
      ticker,
      token_address,
      image_url,
      market_cap,
      tg_channel_link,
      tg_chat_link,
      description,
      unwrapped_jetton_master_address,
    })
    return response.data?.data
  }

  async getTokens(
    limit = 10,
    page = 1,
    tag?: string,
    text?: string,
    id?: string,
    king?: boolean
  ) {
    const response = await this.instance.get<
      GenericApiResponse<ITokensResponse>
    >('/v1/token', {
      params: { limit, page, tag, text, id, king },
    })
    return response.data?.data
  }

  async getTonUsd() {
    const response =
      await this.instance.get<
        GenericApiResponse<{ usd: number }>
      >('/v1/exchange')
    return response.data?.data
  }

  async getTransactions({
    page = 1,
    limit = 10,
    token,
    sender,
  }: {
    token: string
    page?: number
    limit?: number
    sender?: string
  }) {
    const response = await this.instance.get<
      GenericApiResponse<ITransactionsResponse>
    >('/v1/transaction/histories', {
      params: { page, limit, token, sender },
    })
    return response.data?.data
  }

  async saveTransaction({
    type,
    token_address,
    txHash,
    jettonAmount,
    tonAmount,
    version = 'v1',
  }: {
    type: EActionType
    token_address: string
    txHash: string
    jettonAmount: string
    tonAmount: string
    version?: 'v1' | 'v2'
  }) {
    return this.retryRequest(async () => {
      const response = await this.instance.post<
        GenericApiResponse<{ idKey: string }>
      >(`/${version}/transaction/action`, {
        type,
        token_address,
        txHash,
        jettonAmount,
        tonAmount,
      })
      return response.data?.data
    })
  }

  async getLeaderboard() {
    const response = await this.instance.get<
      GenericApiResponse<ILeaderboardResponse>
    >('/v1/leaderboard')
    return response.data?.data
  }

  async getLeaderboardV2() {
    const response = await this.instance.get<
      GenericApiResponse<{ data: ILeaderboardDataV2[] }>
    >('/v2/leaderboard')
    return response.data?.data
  }

  async getTokenHolders({
    limit = 10,
    page = 1,
    token,
  }: {
    limit?: number
    page?: number
    token: string
  }) {
    const response = await this.instance.get<
      GenericApiResponse<ITokenHoldersResponse>
    >('/v1/token/holders', {
      params: { id: token, limit, page },
    })
    return response.data?.data
  }

  async getTasks() {
    const response = await this.instance.get<
      GenericApiResponse<IGetTasksResponse>
    >('/v1/profile/tasks')
    return response
  }

  async sendTaskCompletion(id: string) {
    const response = await this.instance.post<
      GenericApiResponse<unknown>
    >(`/v1/profile/tasks/${id}`)
    return response.data.data
  }

  async sendTgTaskCompletion(id: string) {
    const response = await this.instance.post<
      GenericApiResponse<unknown>
    >(`/v1/profile/tasks/tg/${id}`)
    return response.data.data
  }

  async claimTaskReward(id: string) {
    const response = await this.instance.post<
      GenericApiResponse<unknown>
    >(`/v1/profile/tasks/${id}/claim`, { id })
    return response.data.data
  }

  async claimDailyReward() {
    const response = await this.instance.post<
      GenericApiResponse<{ status: string }>
    >(`/v1/reward/claim`)
    return response.data.data
  }

  async getDailyReward() {
    const response =
      await this.instance.get<
        GenericApiResponse<ICheckRewardResponse>
      >(`/v1/reward`)
    return response.data.data
  }

  async getBalanceByCategories() {
    const response = await this.instance.get<
      GenericApiResponse<IBalanceByCategoriesResponse>
    >(`/v1/stat/points/categories`)
    return response.data.data
  }

  async getMyFPBalance() {
    const response = await this.instance.get<
      GenericApiResponse<{ points: string }>
    >(`/v1/profile/points`)
    return response.data.data
  }

  async getMyRefs(limit = 10, page = 1) {
    const response = await this.instance.get<
      GenericApiResponse<{
        docs: IMyRefsResponse[]
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        nextPage: number
        page: number
        pagingCounter: number
        prevPage: number
        totalDocs: number
        totalPages: number
      }>
    >(`/v1/profile/myrefs`, { params: { limit, page } })
    return response.data.data
  }

  async getCurrentPlace() {
    const response = await this.instance.get<
      GenericApiResponse<IProgressResponse>
    >(`/v1/profile/ref/progress`)
    return response.data.data
  }

  async queueStatus(key: string) {
    const response = await this.instance.get<
      GenericApiResponse<{
        status: EQueueStatus
        operationId: string
      }>
    >(`/v1/queue/${key}/status`)
    return response.data.data
  }

  async sendClicks(click: number) {
    const response = await this.instance.post<
      GenericApiResponse<{
        success: boolean
      }>
    >(`/v1/clicker`, { click })
    return response.data.status === 'ok'
  }

  async trackContractTask(
    txHash: string,
    type:
      | 'ton02'
      | 'claimnanofomo'
      | 'friendnanofomo'
      | 'nft'
      | 'ogpass'
  ) {
    return this.retryRequest(async () => {
      const response = await this.instance.post<
        GenericApiResponse<{
          success: boolean
          idKey: string
        }>
      >(`/v1/transaction/task`, { txHash, type })
      return response.data.data
    })
  }

  async getChartData(tokenId: string) {
    const response = await this.instance.get<
      GenericApiResponse<IChartData[]>
    >(`/v1/token/price/${tokenId}`)
    return response.data.data
  }

  async getChartProData(
    tokenId: string,
    resolution: string,
    start: number,
    end: number
  ) {
    const response = await this.instance.get<
      GenericApiResponse<IChartProData[]>
    >(`/v2/token/price/${tokenId}`, {
      params: { start, end, intervals: resolution },
    })
    return response.data.data
  }

  async bet(userBet: string) {
    const response = await this.instance.post<
      GenericApiResponse<IUserBet>
    >(`/v1/game/random`, { userBet })
    return response.data.data
  }

  async getMonitorData(
    tokenId: string,
    interval: '5m' | '15m' | '1H' | '24H'
  ) {
    const response = await this.instance.get<
      GenericApiResponse<IMonitorData>
    >(`/v1/token/metadata/${tokenId}`, {
      params: { intervals: interval },
    })
    return response.data.data
  }

  async getLastTransaction() {
    const response = await this.instance.get<
      GenericApiResponse<ILastTransaction>
    >(`/v1/transaction/last`)
    return response.data.data
  }
}
