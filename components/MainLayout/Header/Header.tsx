import Logo from 'components/Logo/Logo'

import Menu from './Menu/Menu'

import s from './Header.module.scss'


const Header: React.FunctionComponent = () => (
  <div className={s.container}>
    <Logo className={s.logo}/>
    <Menu />
  </div>
)


export default Header
