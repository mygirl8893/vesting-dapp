import Link from 'next/link'

import s from './Menu.module.scss'


const Menu = () => (
  <div className="ml-40">
    <Link href="/distribute">
      <a className={s.link}>Distribute</a>
    </Link>
    <Link href="/claim">
      <a className={s.link}>Claim</a>
    </Link>
  </div>
)


export default Menu
