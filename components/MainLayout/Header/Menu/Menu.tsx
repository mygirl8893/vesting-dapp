import Link from 'next/link'
import { useWeb3React } from '@web3-react/core'
import { ownerAddress } from 'contracts'

import s from './Menu.module.scss'


const Menu = () => {
  const { account } = useWeb3React()

  return (
    <div className="ml-40">
      {
        account === ownerAddress ? (
          <Link href="/distribute">
            <a className={s.link}>Distribute</a>
          </Link>
        ) : (
          <Link href="/claim">
            <a className={s.link}>Claim</a>
          </Link>
        )
      }
    </div>
  )
}


export default Menu
