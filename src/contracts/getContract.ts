import type { Contracts, ContractName } from './config'
import state from './state'


const getContract = <Name extends ContractName>(name: Name, withWalletProvider?: boolean): Contracts[Name] => {
  if (withWalletProvider) {
    return state.contractsWithProvider[name]
  }

  return state.contracts[name]
}


export default getContract
