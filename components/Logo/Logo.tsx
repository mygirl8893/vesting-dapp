import cx from 'classnames'
import Link from 'next/link'

import InlineSvg from 'components/InlineSvg/InlineSvg'

import s from './Logo.module.scss'


type LogoProps = {
  className?: string
}

const Logo: React.FunctionComponent<LogoProps> = ({ className }) => (
  <Link href="/">
    <a className={cx(className, s.logo)}>
      <InlineSvg src="/static/images/logo.svg" />
    </a>
  </Link>
)


export default Logo
