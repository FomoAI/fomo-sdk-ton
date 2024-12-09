import { ETaskGroup } from '../constants'

export type TTaskStatus =
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'claim'

export type TTaskCategory =
  | 'social'
  | 'partner'
  | 'stories'
  | 'ref'
  | 'addwallet'
  | 'trade'
  | 'launchtoken'
  | 'ton02'
  | 'nanofomo'
  | 'friendnanofomo'
  | 'nft'
  | 'ogpass'

export interface ITask {
  bonus: number
  category: TTaskCategory
  createAt: string
  customer: string
  description: string | null
  group: ETaskGroup
  display: boolean
  icon: string
  image: string
  stars: number
  link: string
  main: boolean
  position: number
  source: string
  status: TTaskStatus
  statusPosition: number
  taskType: 'link'
  title: string
  updatedAt: string
  remaining: number
  maxRemaining: number
  active: boolean
  nftMetadata?: {
    bigInt: number
    type: string
  }
  _id: string
}
