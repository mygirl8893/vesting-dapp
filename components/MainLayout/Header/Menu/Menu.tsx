import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectMetaMaskAccounts } from 'redux/main'
import { OWNER_ACCOUNT_ID } from 'constants/owner'

import s from './Menu.module.scss'


const Menu: React.FunctionComponent = () => {
  const accounts = useSelector(selectMetaMaskAccounts)
  const isOwner = accounts[0] === OWNER_ACCOUNT_ID

  return (
    <div className={s.container}>
      {
        isOwner && (
          <Link href="/spread">
            <a className={s.link}>Spread</a>
          </Link>
        )
      }
      <Link href="/claim">
        <a className={s.link}>Claim</a>
      </Link>
    </div>
  )
}


export default Menu
