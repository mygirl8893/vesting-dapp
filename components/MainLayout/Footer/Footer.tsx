import Logo from 'components/Logo/Logo'

import s from './Footer.module.scss'


const Footer: React.FunctionComponent = () => (
  <div className={s.container}>
    <Logo />
    <div className={s.copy}>
      &copy; 2021, Crypto Project. All Rights Reserved.
    </div>
  </div>
)


export default Footer
