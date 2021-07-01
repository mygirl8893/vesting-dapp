import { useWeb3React } from '@web3-react/core'

import Logo from 'components/Logo/Logo'

import Menu from './Menu/Menu'
import ConnectButton from './ConnectButton/ConnectButton'
import AccountButton from './AccountButton/AccountButton'

import s from './Header.module.scss'


const Header: React.FunctionComponent = () => {
  const { active } = useWeb3React()

  return (
    <div className={s.container}>
      <div className={s.left}>
        <Logo className={s.logo}/>
        {active && <Menu />}
      </div>
      {active ? <AccountButton /> : <ConnectButton />}
    </div>
  )
}


export default Header
