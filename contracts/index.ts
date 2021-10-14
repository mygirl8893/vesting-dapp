import { Contract } from '@ethersproject/contracts'
import { Web3Provider, InfuraProvider } from '@ethersproject/providers'

import type { Vesting, Token } from './types'

import vestingAbi from './vesting.json'
import tokenAbi from './token.json'


const provider = typeof window !== 'undefined' && window.ethereum ? new Web3Provider(window.ethereum) : new InfuraProvider('rinkeby')

export const ownerAddress = '0x79fcb05Bbf72fA720120154905D98390b9130C0E'
export const tokenAddress = '0xEcF259aA3Fb1123DC41B8426F72452F1674678b8'
export const vestingAddress = '0x79355218ff8CDe92972d5bbAD45c5Dd9Aae121Cc'

export const tokenContract = new Contract(tokenAddress, tokenAbi, provider) as unknown as Token
export const vestingContract = new Contract(vestingAddress, vestingAbi, provider) as unknown as Vesting

const getContract = <T>(library, address, abi): T => {
  if (!library) {
    return null
  }

  return new Contract(address, abi, library.getSigner()) as unknown as T
}

export const getVestingContract = (library): Vesting => getContract(library, vestingAddress, vestingAbi)
export const getTokenContract = (library): Token => getContract(library, tokenAddress, tokenAbi)
