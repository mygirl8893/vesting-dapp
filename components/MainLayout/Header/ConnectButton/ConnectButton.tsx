import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import localStorageNames from 'constants/localStorageNames'
import { useEagerConnect, useInactiveListener } from 'hooks'
import { injected } from 'helpers/connectors'

import s from './ConnectButton.module.scss'


const ConnectButton: React.FunctionComponent = () => {
  const context = useWeb3React<Web3Provider>()
  const { connector, activate } = context

  const [ activatingConnector, setActivatingConnector ] = useState<any>(null)

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(null)
    }
  }, [ activatingConnector, connector ])

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  const handleClick = () => {
    window.localStorage.removeItem(localStorageNames.deactivated)
    setActivatingConnector(injected)
    activate(injected)
  }

  return (
    <button className={s.button} onClick={handleClick}>
      Connect
    </button>
  )
}


export default ConnectButton
