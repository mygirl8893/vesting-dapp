import { useRef, useEffect } from 'react'
import { formatUnits } from '@ethersproject/units'
import { getContract } from 'contracts'
import { useConnect } from 'web3'
import { useReducerState } from 'hooks'


export type Data = {
  totalTokens: number
  alreadyClaimed: number
  alreadyVested: number
  availableToClaim: number
  remainingToVest: number
  startDate: number
  cliffDate: number
  endDate: number
}

const formatValue = (value, decimals) =>
  parseFloat(formatUnits(value, decimals))

const getData = async ({ account, vestingContract }) => {
  const cpoolContract = getContract('cpool')

  const [ decimals, info, balance ] = await Promise.all([
    cpoolContract.decimals(),
    vestingContract.recipients(account),
    vestingContract.getAvailableBalance(account),
  ])

  const { amount, claimed, vestingBegin, vestingCliff, vestingEnd } = info

  const totalTokens = formatValue(amount, decimals)
  const alreadyClaimed = formatValue(claimed, decimals)
  const alreadyVested = formatValue(balance.add(claimed), decimals)
  const availableToClaim = formatValue(balance, decimals)
  const remainingToVest = formatValue(amount.sub(claimed), decimals)

  const startDate = new Date(vestingBegin as any * 1000)
  const cliffDate = new Date(vestingCliff as any * 1000)
  const endDate = new Date(vestingEnd as any * 1000)

  return {
    totalTokens,
    alreadyClaimed,
    alreadyVested,
    availableToClaim,
    remainingToVest,
    startDate,
    cliffDate,
    endDate,
  }
}

const useData = () => {
  const { account } = useConnect()
  const [ state, setState ] = useReducerState({
    isFetching: true,
    isAutoFetching: false,
    isManualFetching: false,
    autoData: null,
    manualData: null,
  })

  const { isFetching, isAutoFetching, isManualFetching, autoData, manualData } = state

  const fetch = async () => {
    const autoVestingContract = getContract('autoVesting')
    const manualVestingContract = getContract('manualVesting')

    const [ autoData, manualData ] = await Promise.all([
      // getData({ account, vestingContract: autoVestingContract }),
      Promise.resolve(null),
      getData({ account, vestingContract: manualVestingContract }),
    ])

    setState({
      isFetching: false,
      autoData,
      manualData,
    })
  }

  const timerRef = useRef<any>(null)

  useEffect(() => {
    if (account) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      fetch()
    }
    else {
      // account is always undefined on first render
      // need to wait for window.ethereum to be injected
      timerRef.current = setTimeout(() => {
        setState({ isFetching: false })
      }, 1000)
    }
  }, [ account ])

  const fetchAutoData = async () => {
    setState({ isAutoFetching: true })

    const vestingContract = getContract('autoVesting')

    const data = await getData({ account, vestingContract })

    setState({
      isAutoFetching: false,
      autoData: data,
    })
  }

  const fetchManualData = async () => {
    setState({ isManualFetching: true })

    const vestingContract = getContract('manualVesting')

    const data = await getData({ account, vestingContract })

    setState({
      isManualFetching: false,
      manualData: data,
    })
  }

  return {
    isFetching,
    isAutoFetching,
    isManualFetching,
    autoData,
    manualData,
    fetchAutoData,
    fetchManualData,
  }
}


export default useData
