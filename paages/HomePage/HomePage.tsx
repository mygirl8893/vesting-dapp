import cx from 'classnames'

import MainLayout from 'components/MainLayout/MainLayout'

import s from './HomePage.module.scss'


const HomePage = () => (
  <MainLayout>
    <div className={cx(s.content, 'width-container')}>
      <div className={s.texts}>
        <div className={s.title}>Game Changing Liquidity.<br />Juicy Rewards.</div>
        <div className={s.text}>
          Clearpool is a decentralized clearing protocol. A smart contract platform where institutions can borrow
          under-collateralized liquidity and LPs earn attractive rewards.
        </div>
      </div>
    </div>
  </MainLayout>
)


export default HomePage
