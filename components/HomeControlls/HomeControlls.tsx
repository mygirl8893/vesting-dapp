import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectMetaMaskAccounts } from 'redux/main'

import s from './HomeControlls.module.scss'


const HomeControlls: React.FunctionComponent = (props) => {
  const [ address ] = useSelector(selectMetaMaskAccounts)

  return (
    <div className={s.container}>
      <div className={s.address}>
        <div className={s.addressTitle}>
          Your address:
        </div>
        <div className={s.addressContent}>
          {address}
        </div>
      </div>
      <div className={s.controlls}>
        <Link href="/spread">
          <a className={s.link}>Spread</a>
        </Link>
        <Link href="/claim">
          <a className={s.link}>Claim</a>
        </Link>
      </div>
    </div>
  )
}


export default HomeControlls
