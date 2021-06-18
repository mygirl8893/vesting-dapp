import ContractInit from 'web3-eth-contract'

import ABI from './abi.json'


const Contract = ContractInit as any
const ADDRESS = "0x555DfB930A641d23cb90cDbb5953690573d496Ab"

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
  totalTokens: number
  startDate: Date
  endDate: Date
  alreadyClaimed: number
  remainingToVest: number
  availableToClaim: number
  alreadyVested: number
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

        const alreadyVested = Number(balance) + Number(claimed)

        return {
          totalTokens: Number(amount),
          startDate: new Date(vestingBegin * 1000),
          endDate: new Date(vestingEnd * 1000),
          alreadyClaimed: Number(claimed),
          alreadyVested,
          availableToClaim: Number(balance),
          remainingToVest: Number(amount) - alreadyVested,
        }
      }

      return null
    })
}

export const claim = (address: string): Promise<any> => {
  const contract = _getContract()

  return contract.methods.claim(address).call()
}
