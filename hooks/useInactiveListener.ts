import { useEffect } from 'react'
import { connectors } from 'helpers'


const useInactiveListener = (web3React, suppress: boolean = false) => {
  const { active, error, activate } = web3React

  useEffect((): any => {
    const { ethereum } = window as any

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log('Handling "connect" event')
        activate(connectors.injected)
      }

      const handleChainChanged = (chainId: string | number) => {
        console.log('Handling "chainChanged" event with payload', chainId)
        activate(connectors.injected)
      }

      const handleAccountsChanged = (accounts: string[]) => {
        console.log('Handling "accountsChanged" event with payload', accounts)

        if (accounts.length > 0) {
          activate(connectors.injected)
        }
      }

      const handleNetworkChanged = (networkId: string | number) => {
        console.log('Handling "networkChanged" event with payload', networkId)
        activate(connectors.injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [ active, error, suppress, activate ])
}


export default useInactiveListener
