export interface IToken {
  _id: string
  name: string
  ticker: string
  holders_count: number
  token_address: string
  image_url: string
  market_cap: string
  tg_channel_link: string | null
  tg_chat_link: string | null
  description: string | null
  tonAmount: string
  percent: number
  user_info: {
    id: string
    is_bot: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    is_premium?: true
    added_to_attachment_menu?: true
    nickname: string
    photo: string | null
    ton_address: string[]
  }
  is_full: boolean
  unwrapped_jetton_master_address: string | null
  pool_address?: string | null
  transaction_count: number
  createdAt: string
  updatedAt: string
  totalTokenAmount: string
  totalTonAmount: string
}
export interface ITwitterPost {
  createdBy: string
  value: string
  createdAt: number
  id: string
}

export type ITradeStatus = 0n | 1n | 2n
