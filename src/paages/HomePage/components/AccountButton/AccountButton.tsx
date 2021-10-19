import React from 'react'
import { useConnect } from 'web3'

import { openConnectModal } from 'compositions/modals/ConnectModal/ConnectModal'

import s from './AccountButton.module.scss'


const AccountButton = () => {
  const { account, disconnect } = useConnect()

  if (!account) {
    return (
      <div className={s.button} onClick={openConnectModal}>
        <span>Connect wallet</span>
      </div>
    )
  }

  const handleClick = () => {
    disconnect()
  }

  return (
    <div className={s.button} onClick={handleClick}>
      <span>{account.substr(0, 7)}...{account.substr(-7)}</span>
      <img src="/images/disconnect.svg" alt="" />
    </div>
  )
}


export default AccountButton
