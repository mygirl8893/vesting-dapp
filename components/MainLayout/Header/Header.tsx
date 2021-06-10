import { useSelector } from 'react-redux'
import { selectMetaMaskFlags } from 'redux/main'

import Logo from 'components/Logo/Logo'

import Menu from './Menu/Menu'

import s from './Header.module.scss'


const Header: React.FunctionComponent = () => {
  const { isMetaMaskConnected } = useSelector(selectMetaMaskFlags)

  return (
    <div className={s.container}>
      <Logo className={s.logo}/>
      {isMetaMaskConnected && <Menu />}
    </div>
  )
}


export default Header
