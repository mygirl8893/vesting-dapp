import React from 'react'
import { useConnect } from 'web3'
import { ownerAddress } from 'contracts'
import dayjs from 'dayjs'

import { openConnectModal } from 'compositions/modals/ConnectModal/ConnectModal'

import Stats from '../Stats/Stats'
import Form from '../Form/Form'

import useData from './utils/useData'

import s from './Info.module.scss'


const Vesting = ({ isFetching, data, onClaim }) => {
  const { startDate, cliffDate, endDate } = data || {}

  return (
    <>
      {
        Boolean(data.totalTokens) && (
          <div className={s.dates}>
            Vesting period from {dayjs(startDate).format('DD MMM YYYY')} to {dayjs(endDate).format('DD MMM YYYY')}.<br />End of your cliff: {dayjs(cliffDate).format('DD MMM YYYY')}
          </div>
        )
      }
      <Stats isFetching={isFetching} data={data} onClaim={onClaim} />
    </>
  )
}

const Info = () => {
  const { account } = useConnect()
  const { isFetching, isAutoFetching, isManualFetching, autoData, manualData, fetchAutoData, fetchManualData } = useData()

  if (!account) {
    return (
      <div className={s.info}>
        <div className={s.title}>Your initial token sale dashboard</div>
        <button
          className={s.connectButton}
          onClick={openConnectModal}
        >
          Connect wallet to see the status
        </button>
      </div>
    )
  }

  if (account === ownerAddress) {
    return (
      <Form />
    )
  }

  return (
    <div className={s.info}>
      <div className={s.title}>Your initial token sale dashboard</div>
      {
        autoData && (
          <Vesting
            isFetching={isFetching || isAutoFetching}
            data={autoData}
            onClaim={fetchAutoData}
          />
        )
      }
      {
        manualData && (
          <Vesting
            isFetching={isFetching || isManualFetching}
            data={manualData}
            onClaim={fetchManualData}
          />
        )
      }
      {
        !autoData && !manualData && (
          <div className={s.empty}>Nothing to show</div>
        )
      }
    </div>
  )
}


export default Info
