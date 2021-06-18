import type { Info } from 'helpers/contract'
import { claim } from 'helpers/contract'

import s from './InfoBlock.module.scss'


type InfoBlock = {
  data: Info
  error: string
  address: string
  isFetching: boolean
}

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

const numberFormat = new Intl.NumberFormat("en-EN")

const InfoBlock: React.FunctionComponent<InfoBlock> = (props) => {
  const { address, data, error, isFetching } = props
  const { startDate, endDate, alreadyVested, remainingToVest, availableToClaim, alreadyClaimed, totalTokens } = data || {}

  const handleClick = () => {
    claim(address)
      .catch((error) => {
        console.log(error)
      })
  }

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
      <div className={s.infoContainer}>
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
            {numberFormat.format(alreadyVested)}
          </div>
        </div>
        <div className={s.box}>
          <div className={s.boxTitle}>
            Remaining to vest
          </div>
          <div className={s.boxContent}>
            {numberFormat.format(remainingToVest)}
          </div>
        </div>
        <div className={s.box}>
          <div className={s.boxTitle}>
            Already claimed
          </div>
          <div className={s.boxContent}>
            {numberFormat.format(alreadyClaimed)}
          </div>
        </div>
        <div className={s.box}>
          <div className={s.boxTitle}>
            Total tokens
          </div>
          <div className={s.boxContent}>
            {numberFormat.format(totalTokens)}
          </div>
        </div>
        <div className={s.box}>
          <div className={`${s.boxTitle} ${s.accent}`}>
            Available to claim
          </div>
          <div className={`${s.boxContent} ${s.accent}`}>
            {numberFormat.format(availableToClaim)}
          </div>
        </div>
        <div className={s.buttonContainer}>
          <button
            className={s.button}
            disabled={!availableToClaim}
            onClick={handleClick}
          >
            Claim
          </button>
        </div>
      </div>
    )
  })()

  return (
    <div className={s.container}>
      <div className={s.title}>
        Claim tokens
      </div>
      <div className={s.address}>
        <div className={s.addressTitle}>
          Address:
        </div>
        <div className={s.addressContent}>
          {address}
        </div>
      </div>
      {content}
    </div>
  )
}


export default InfoBlock
