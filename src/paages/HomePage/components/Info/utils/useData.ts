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

const decimals = 18

const formatValue = (value, decimals) =>
  parseFloat(parseFloat(formatUnits(value, decimals)).toFixed(4))

const getAutoData = async ({ account }) => {
  const vestingContract = getContract('autoVesting')

  const [ vestingBegin, vestingEnd, count ] = await Promise.all([
    vestingContract.vestingBegin(),
    vestingContract.vestingEnd(),
    vestingContract.vestingCountOf(account),
  ])

  const startDate = new Date(vestingBegin as any * 1000)
  const endDate = new Date(vestingEnd as any * 1000)

  if (!count) {
    return null
  }

  const infos = await Promise.all([ ...Array(parseInt(count.toString())).keys() ].map(async (_, index) => {
    const id = await vestingContract.vestingIds(account, index)

    const [ balance, { amount, vestingCliff, claimed } ] = await Promise.all([
      vestingContract.getAvailableBalance(id),
      vestingContract.vestings(id),
    ])

    const totalTokens = formatValue(amount, decimals)
    const alreadyClaimed = formatValue(claimed, decimals)
    const alreadyVested = formatValue(balance.add(claimed), decimals)
    const remainingToVest = formatValue(amount.sub(balance).sub(claimed), decimals)
    const availableToClaim = formatValue(balance, decimals)
    const cliffDate = new Date(vestingCliff as any * 1000)

    return {
      id,
      totalTokens,
      alreadyClaimed,
      alreadyVested,
      remainingToVest,
      availableToClaim,
      cliffDate,
    }
  }))

  return infos.map((data) => ({
    ...data,
    startDate,
    endDate,
  }))
}

const getManualData = async ({ account }) => {
  const vestingContract = getContract('manualVesting')
  const cpoolContract = getContract('cpool')

  const [ decimals, info, balance ] = await Promise.all([
    cpoolContract.decimals(),
    vestingContract.recipients(account),
    vestingContract.getAvailableBalance(account),
  ])

  const { amount, claimed, vestingBegin, vestingCliff, vestingEnd } = info

  const totalTokens = formatValue(amount, decimals)
  const alreadyClaimed = formatValue(claimed, decimals)
  const availableToClaim = formatValue(balance, decimals)
  const alreadyVested = formatValue(balance.add(claimed), decimals)
  const remainingToVest = formatValue(amount.sub(balance).sub(claimed), decimals)

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
    const [ autoData, manualData ] = await Promise.all([
      getAutoData({ account }),
      getManualData({ account }),
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

    const data = await getAutoData({ account })

    setState({
      isAutoFetching: false,
      autoData: data,
    })
  }

  const fetchManualData = async () => {
    setState({ isManualFetching: true })

    const data = await getManualData({ account })

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
