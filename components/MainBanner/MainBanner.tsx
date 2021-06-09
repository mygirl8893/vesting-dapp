import ConnectButton from './ConnectButton/ConnectButton'

import s from './MainBanner.module.scss'


const MainBanner: React.FunctionComponent = () => (
  <div className={s.container}>
    <div className={s.content}>
      <h1>PTF Token Unlocking & Staking</h1>
      <h2>Connect your web3 wallet</h2>
      <ConnectButton />
    </div>
  </div>
)


export default MainBanner
