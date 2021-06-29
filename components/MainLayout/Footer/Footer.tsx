import Logo from 'components/Logo/Logo'

import s from './Footer.module.scss'


const Footer: React.FunctionComponent = () => (
  <footer className={s.footer}>
    <div className="width-container flex items-center justify-between">
      <div />
      <div className={s.copy}>
        &copy; 2021, Crypto Project. All Rights Reserved.
      </div>
      <div />
    </div>
  </footer>
)


export default Footer
