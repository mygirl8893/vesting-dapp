import React from 'react'
import { vestingContract } from 'contracts'
import { useReducerState } from 'hooks'

import s from './InfoBlock.module.scss'


const formatDate = (date: Date) => {
  if (date instanceof Date) {
    let day: string | number = date.getDate()
    day = day < 10 ? `0${day}` : day

    let month: string | number = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month

    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  return ''
}

type InfoBlock = {
  account: string
  data: any
}

const InfoBlock: React.FunctionComponent<InfoBlock> = (props) => {
  const { account, data } = props

  const { startDate, endDate, alreadyVested, remainingToVest,
    availableToClaim, alreadyClaimed, totalTokens } = data || {}

  const [ { isSubmitting, error }, setState ] = useReducerState({ isSubmitting: false, error: null })

  const handleClaimClick = async () => {
    if (isSubmitting) {
      return
    }

    setState({ isSubmitting: true, error: null })

    try {
      const receipt = await vestingContract.claim(account)

      console.log('receipt:', receipt)

      await receipt.wait()

      setState({ isSubmitting: false })
    }
    catch (err) {
      console.error(err)

      setState({ isSubmitting: false, error: err.toString() })
    }
  }

  return (
    <div className={s.container}>
      <div className={s.box}>
        <div className={s.boxTitle}>
          Start date
        </div>
        <div className={s.boxContent}>
          {formatDate(startDate as Date)}
        </div>
      </div>
      <div className={s.box}>
        <div className={s.boxTitle}>
          End date
        </div>
        <div className={s.boxContent}>
          {formatDate(endDate as Date)}
        </div>
      </div>
      <div className={s.box}>
        <div className={s.boxTitle}>
          Already vested
        </div>
        <div className={s.boxContent}>
          {alreadyVested}
        </div>
      </div>
      <div className={s.box}>
        <div className={s.boxTitle}>
          Remaining to vest
        </div>
        <div className={s.boxContent}>
          {remainingToVest}
        </div>
      </div>
      <div className={s.box}>
        <div className={s.boxTitle}>
          Already claimed
        </div>
        <div className={s.boxContent}>
          {alreadyClaimed}
        </div>
      </div>
      <div className={s.box}>
        <div className={s.boxTitle}>
          Total tokens
        </div>
        <div className={s.boxContent}>
          {totalTokens}
        </div>
      </div>
      <div className={s.box}>
        <div className={`${s.boxTitle} ${s.accent}`}>
          Available to claim
        </div>
        <div className={`${s.boxContent} ${s.accent}`}>
          {availableToClaim}
        </div>
      </div>
      <div className={s.buttonContainer}>
        <button
          className={s.button}
          disabled={availableToClaim === '0' || isSubmitting}
          onClick={handleClaimClick}
        >
          Claim
        </button>
      </div>
    </div>
  )
}


export default InfoBlock
