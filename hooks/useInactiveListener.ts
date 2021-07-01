import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from 'helpers/connectors'


const useInactiveListener = (suppress: boolean = false) => {
  const { active, error, activate } = useWeb3React()

  useEffect((): any => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleActivate = () => activate(injected)

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected)
        }
      }

      ethereum.on('connect', handleActivate)
      ethereum.on('chainChanged', handleActivate)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleActivate)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleActivate)
          ethereum.removeListener('chainChanged', handleActivate)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleActivate)
        }
      }
    }
  }, [ active, error, suppress, activate ])
}


export default useInactiveListener
