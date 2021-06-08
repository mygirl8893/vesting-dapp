import Link from 'next/link'

import s from './Menu.module.scss'


const Menu = () => (
  <div className={s.container}>
    <Link href="/">
      <a className={s.link}>Home</a>
    </Link>
    <Link href="/spread">
      <a className={s.link}>Spread</a>
    </Link>
    <Link href="/claim">
      <a className={s.link}>Claim</a>
    </Link>
  </div>
)


export default Menu
