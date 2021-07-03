import { Contract } from '@ethersproject/contracts'
import { Web3Provider, InfuraProvider } from '@ethersproject/providers'

import type { Vesting, Token } from './types'

import vestingAbi from './vesting.json'
import tokenAbi from './token.json'


const provider = typeof window !== 'undefined' && window.ethereum ? new Web3Provider(window.ethereum) : new InfuraProvider('rinkeby')

export const tokenAddress = '0x8229439261B51eC0a8f0252397A0A1096A725316'
export const vestingAddress = '0x071bB7B930d9864c1c3FFafFb0f31739f5Fd8ce3'

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
