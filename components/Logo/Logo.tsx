import cx from 'classnames'

import Link from 'next/link'

import s from './Logo.module.scss'


type LogoProps = {
  className?: string
}

const Logo: React.FunctionComponent<LogoProps> = ({ className }) => (
  <Link href="/">
    <a className={cx(className, s.logo)}>
      LOGO
    </a>
  </Link>
)


export default Logo
