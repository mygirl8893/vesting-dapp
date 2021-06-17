import ContractInit from 'web3-eth-contract'

import ABI from './abi.json'


const Contract = ContractInit as any
const ADDRESS = "0x46B560b8C13105361c80b0272A7AbAaa5FdF9482"

let contractInstance: any = null

const _getContract = () => {
  if (contractInstance) {
    return contractInstance
  }

  Contract.setProvider(window.web3.currentProvider)
  contractInstance = new Contract(ABI, ADDRESS)

  return contractInstance
}

type HoldTokensInput = {
  params: {
    address: string
    amount: string
    startDate: number
    endDate: number
    cliffDate: number
  }
  from: string 
}

export const holdTokens = (values: HoldTokensInput) => {
  const { params, from } = values
  const { address, amount, startDate, endDate, cliffDate } = params

  const contract = _getContract()

  return contract.methods.holdTokens(address, amount, startDate, endDate, cliffDate)
    .send({ from })
}


export type Info = {
  totalTokens: string
  startDate: Date
  endDate: Date
  alreadyClaimed: string
}

export const getInfo = (address: string): Promise<Info> => {
  const contract = _getContract()

  return Promise.all([
    contract.methods.recipients(address).call(),
    // contract.methods.getAvailableBalance(address).call(),
  ])
    .then(([ info ]) => {
      console.log('info', info)

      if (info?.amount) {
        const { amount, vestingBegin, vestingEnd, claimed } = info

        return {
          totalTokens: amount,
          startDate: new Date(vestingBegin * 1000),
          endDate: new Date(vestingEnd * 1000),
          alreadyClaimed: claimed,
        }
      }

      return Promise.reject()
    })
}

export const claim = (address: string): Promise<any> => {
  const contract = _getContract()

  return contract.methods.claim(address).call()
}



