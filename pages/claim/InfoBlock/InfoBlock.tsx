import { claim } from 'helpers/contract'

import s from './InfoBlock.module.scss'

// TODO - remove any
type InfoBlock = any | {
  address: string
  startDate: Date
  endDate: Date
  vested: number
  remainingToVest: number
  availableToClaim: number
  alreadyClaimed: number
  totalTokens: number
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

const InfoBlock: React.FunctionComponent<InfoBlock> = (props) => {
  const {
    address, startDate, endDate, vested, remainingToVest,
    availableToClaim, alreadyClaimed, totalTokens,
  } = props

  const handleClick = () => {
    claim(address)
      .catch((error) => {
        console.log(error)
      })
  }

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
      <div className={s.infoContainer}>
        <div className={s.box}>
          <div className={s.boxTitle}>
            Start date
          </div>
          <div className={s.boxContent}>
            {formatDate(startDate)}
          </div>
        </div>
        <div className={s.box}>
          <div className={s.boxTitle}>
            End date
          </div>
          <div className={s.boxContent}>
            {formatDate(endDate)}
          </div>
        </div>
        <div className={s.box}>
          <div className={s.boxTitle}>
            Already vested
          </div>
          <div className={s.boxContent}>
            {vested}
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
            disabled={!availableToClaim}
            onClick={handleClick}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  )
}


export default InfoBlock
