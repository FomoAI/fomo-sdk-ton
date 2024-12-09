export interface IUser {
  image: string
  name: string
}

export interface IReferralUser extends IUser {
  joinedAt: number
  isActive: boolean
  gasEarned: number
}

export interface IUserInfo {
  _id: string
  username: string
  updatedAt: string
  ton_address: string[]
  photo: string
  points: { $numberDecimal: string }
  last_name: string
  language_code: string
  is_bot: boolean
  first_name: string
  id: string
  createdAt: string
}
