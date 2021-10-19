import { Contract } from '@ethersproject/contracts'
import { Web3Provider, AlchemyProvider } from '@ethersproject/providers'

import type { ContractsAbi, Contracts, ContractName } from './config'
import { contracts } from './config'
import state from './state'


export const createContract = <Name extends ContractName>(name: Name, provider: any): ContractsAbi[Name] => {
  const { address, abi } = contracts[name]

  return new Contract(address, abi, provider) as ContractsAbi[Name]
}

const createContracts = (withWalletProvider?: boolean) => {
  const store = (withWalletProvider ? state.contractsWithProvider : state.contracts) as Contracts
  const names = Object.keys(contracts) as Array<ContractName>
  let provider

  if (withWalletProvider) {
    provider = state.walletProvider.getSigner()
  }
  else {
    provider = typeof window !== 'undefined' && window.ethereum
      ? new Web3Provider(window.ethereum) // Metamask
      : new AlchemyProvider('rinkeby', process.env.NEXT_PUBLIC_ALCHEMY_URL)
  }

  names.forEach((name) => {
    store[name] = createContract(name, provider) as any
  })
}


export default createContracts
