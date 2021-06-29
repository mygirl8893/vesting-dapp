import { useWeb3React } from '@web3-react/core'

import Logo from 'components/Logo/Logo'

import Menu from './Menu/Menu'
import WalletButton from './WalletButton/WalletButton'

import s from './Header.module.scss'


const Header: React.FunctionComponent = () => {
  const { account } = useWeb3React()

  return (
    <header className={s.header}>
      <div className="width-container flex items-center justify-between">
        <Logo className={s.logo}/>
        {account && <Menu />}
        <WalletButton />
      </div>
    </header>
  )
}


export default Header
