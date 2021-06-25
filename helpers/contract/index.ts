import ContractInit from 'web3-eth-contract'
import bn from 'helpers/bn'

import ABI from './abi.json'


const Contract = ContractInit as any
const ADDRESS = "0x071bB7B930d9864c1c3FFafFb0f31739f5Fd8ce3"

let contractInstance: any = null

const _getContract = () => {
  if (contractInstance) {
    return contractInstance
  }

  Contract.setProvider(window.web3.currentProvider)
  contractInstance = new Contract(ABI, ADDRESS)

  return contractInstance
}

export const setProvider = () => {
  const contract = _getContract()

  contract.setProvider(window.web3.currentProvider)
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
  remainingToVest: string
  availableToClaim: string
  alreadyVested: string
}

export const getInfo = (address: string): Promise<Info | null> => {
  const contract = _getContract()

  return Promise.all([
    contract.methods.recipients(address).call(),
    contract.methods.getAvailableBalance(address).call(),
  ])
    .then(([ info, balance ]) => {
      if (info?.amount !== '0') {
        const { amount, vestingBegin, vestingEnd, claimed } = info

        const alreadyVested = bn.add(balance, claimed)
        const remainingToVest = bn.subtract(amount, alreadyVested)

        return {
          // need to get millisecond
          endDate: new Date(vestingEnd * 1000),
          startDate: new Date(vestingBegin * 1000),
          totalTokens: bn.getValueFromBN(amount),
          alreadyClaimed: bn.getValueFromBN(claimed),
          alreadyVested: bn.getValueFromBN(alreadyVested),
          availableToClaim: bn.getValueFromBN(balance),
          remainingToVest: bn.getValueFromBN(remainingToVest),
        }
      }

      return null
    })
}

export const claim = (address: string): Promise<any> => {
  const contract = _getContract()

  return contract.methods.claim(address).send({ from: address })
}
