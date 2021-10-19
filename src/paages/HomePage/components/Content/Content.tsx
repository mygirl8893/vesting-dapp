import React from 'react'

import Info from '../Info/Info'

import s from './Content.module.scss'


const Content = () => {

  return (
    <div className={s.content}>
      <div className={s.headline}>
        <div className={s.title}>Welcome to the investor room</div>
        <div className={s.text}>Review your status and claim your vested tokens</div>
      </div>
      <Info />
    </div>
  )
}


export default Content
