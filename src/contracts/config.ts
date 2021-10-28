import type { CPOOL, AutoVesting, ManualVesting } from './types'

import cpoolAbi from './abis/CPOOL.json'
import autoVestingAbi from './abis/AutoVesting.json'
import manualVestingAbi from './abis/ManualVesting.json'


export type ContractsAbi = {
  'cpool': CPOOL
  'autoVesting': AutoVesting
  'manualVesting': ManualVesting
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
    abi: autoVestingAbi,
  },
  manualVesting: {
    address: process.env.NEXT_PUBLIC_MANUAL_VESTING,
    abi: manualVestingAbi,
  },
}

console.log('contracts:', contracts)
