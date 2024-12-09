import { EWalletType } from '../constants'

export interface IConnectedWallet {
  type: EWalletType
  address: string
}
