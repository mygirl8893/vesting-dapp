import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import AccountModal from './AccountModal/AccountModal'

import s from './AccountButton.module.scss'


const AccountButton: React.FunctionComponent = () => {
  const { account } = useWeb3React<Web3Provider>()

  const [ isOpen, setOpen ] = useState(false)

  const id = typeof account === 'string' && account.substring(account.length - 4)

  return (
    <>
      <button className={s.button} onClick={() => setOpen(true)}>
        {`Account 0x...${id}`}
      </button>
      <AccountModal isOpen={isOpen} onClose={() => setOpen(false)}/> 
    </>
  )
}


export default AccountButton
