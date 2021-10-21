import React from 'react'

import AccountButton from '../AccountButton/AccountButton'

import s from './Header.module.scss'


const Header = () => {

  return (
    <div className={s.header}>
      <div className={s.logoContainer}>
        <a className={s.logo} href="https://clearpool.finance">
          <img src="/images/header-logo.svg" alt="" />
        </a>
        <div className={s.logoTitle}>Vesting</div>
      </div>
      <div className={s.right}>
        <div className={s.nav}>
          <a className={s.navItem} href="https://clearpool-finance.gitbook.io/about" target="_blank" rel="noreferrer">About</a>
          <a className={s.navItem} href="https://clearpool.finance?scrollTo=markets">Buy $CPOOL</a>
        </div>
        <AccountButton />
      </div>
    </div>
  )
}


export default Header
