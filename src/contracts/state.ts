import { Web3Provider } from '@ethersproject/providers'

import type { Contracts } from './config'


type State = {
  walletProvider: Web3Provider
  contracts: Contracts
  contractsWithProvider: Contracts
}

const state: State = {
  walletProvider: null,
  contracts: {} as any,
  contractsWithProvider: {} as any,
}


export default state
