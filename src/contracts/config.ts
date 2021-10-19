import type { CPOOL, Vesting } from './types'

import cpoolAbi from './abis/CPOOL.json'
import vestingAbi from './abis/Vesting.json'


export type ContractsAbi = {
  'cpool': CPOOL
  'autoVesting': Vesting
  'manualVesting': Vesting
}

export type ContractName = keyof ContractsAbi

export type ContractData<Symbol extends string> = {
  address: string
  abi: object[]
  symbol?: Symbol
  decimals?: number
}

export type ContractsData = {
  [Name in ContractName]: ContractData<string>
}

export type Contracts = {
  [Name in ContractName]: ContractsAbi[Name]
}

export const contracts: ContractsData = {
  cpool: {
    address: process.env.NEXT_PUBLIC_CPOOL,
    abi: cpoolAbi,
  },
  autoVesting: {
    address: process.env.NEXT_PUBLIC_AUTO_VESTING,
    abi: vestingAbi,
  },
  manualVesting: {
    address: process.env.NEXT_PUBLIC_MANUAL_VESTING,
    abi: vestingAbi,
  },
}
