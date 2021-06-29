import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { FixedNumber, BigNumber } from '@ethersproject/bignumber'
import { tokenContract, vestingContract } from 'contracts'
import { useReducerState } from 'hooks'

import availableWithMetaMask from 'decorators/availableWithMetaMask'

import MainLayout from 'components/MainLayout/MainLayout'

import InfoBlock from './InfoBlock/InfoBlock'

import s from './ClaimPage.module.scss'


type State = {
  data: null | any,
  isFetching: boolean,
  error: null | string,
}

const ClaimPage: React.FunctionComponent = () => {
  const { account } = useWeb3React()

  const [ state, setState ] = useReducerState<State>({
    isFetching: true,
    data: null,
    error: null,
  })

  const { isFetching, data, error } = state

  useEffect(() => {
    if (!account) {
      return
    }

    (async () => {
      try {
        setState({ isFetching: true })

        let [ tokenDecimals, info, balance ] = await Promise.all([
          tokenContract.decimals(),
          vestingContract.recipients(account),
          vestingContract.getAvailableBalance(account),
        ])

        const formatValue = (value: BigNumber): FixedNumber => {
          const dec = FixedNumber.fromString(BigNumber.from(10).pow(BigNumber.from(tokenDecimals)).toString())

          return FixedNumber.fromString(value.toString()).divUnsafe(dec)
        }

        const { amount, claimed, vestingBegin, vestingEnd } = info

        const fixedBalance = formatValue(balance)
        const fixedAmount = formatValue(amount)
        const fixedClaimed = formatValue(claimed)

        const fixedAlreadyVested = fixedBalance.addUnsafe(fixedClaimed)
        const fixedRemainingToVest = fixedAmount.subUnsafe(fixedClaimed)

        setState({
          isFetching: false,
          data: {
            endDate: new Date(vestingEnd as any * 1000),
            startDate: new Date(vestingBegin as any * 1000),
            totalTokens: fixedAmount.toString(),
            alreadyClaimed: fixedClaimed.toString(),
            alreadyVested: fixedAlreadyVested.toString(),
            availableToClaim: fixedBalance.toString(),
            remainingToVest: fixedRemainingToVest.toString(),
          },
        })
      }
      catch (err) {
        console.error(err)

        setState({
          isFetching: false,
          data: null,
          error: err.toString(),
        })
      }
    })()
  }, [ account ])

  const content = (() => {
    if (isFetching) {
      return (
        <div className={s.infoText}>
          Loading...
        </div>
      )
    }

    if (!isFetching && !data) {
      return (
        <div className={s.infoText}>
          No information on this address
        </div>
      )
    }

    if (error) {
      return (
        <div className={s.error}>
          Error: {error}
        </div>
      )
    }

    return (
      <InfoBlock account={account} data={data} />
    )
  })()

  return (
    <MainLayout>
      <div className={s.container}>
        {content}
      </div>
    </MainLayout>
  )
}


export default availableWithMetaMask(ClaimPage)
