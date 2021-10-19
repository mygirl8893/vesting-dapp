import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import type { Web3Provider } from '@ethersproject/providers'
import type { AbstractConnector } from '@web3-react/abstract-connector'

import connectors from './connectors'
import constants from './constants'


const requiredChainId = 4

type Output = {
  account: string
  chainId: number
  requiredChainId: number
  library: Web3Provider
  connector: AbstractConnector
  isActive: boolean
  isMainnet: boolean
  isRightNetwork: boolean
  error: string | null
  disconnect: () => void
  setError: (message: string) => void
  connect: (connectorName: string, callback?: () => void) => void
}

const removeConnectorName = () => localStorage.removeItem(constants.connectorName)

const useConnect = (): Output => {
  const web3React = useWeb3React()

  const { account, library, connector, active, activate, deactivate, error, setError: _setError } = web3React

  const setError = useCallback<Output['setError']>((message) => {
    _setError(new Error(message))
  }, [])

  const connect = useCallback<Output['connect']>((connectorName, callback) => {
    activate(connectors[connectorName])
      .then(() => {
        localStorage.setItem(constants.connectorName, connectorName)
        connectors[connectorName].on('Web3ReactDeactivate', removeConnectorName)

        if (typeof callback === 'function') {
          callback()
        }
      })
      .catch((err) => {
        console.log(`${connectorName} error: `, err)
      })
  }, [])

  const disconnect = useCallback<Output['disconnect']>(() => {
    const connectorName = localStorage.getItem(constants.connectorName)

    connectors[connectorName].off('Web3ReactDeactivate', removeConnectorName)
    localStorage.removeItem(constants.connectorName)
    deactivate()
  }, [])

  const chainId = web3React.chainId || parseInt(window.ethereum?.chainId || 0) || undefined
  const isRightNetwork = chainId === requiredChainId

  return {
    account,
    library,
    chainId,
    requiredChainId,
    connector,
    error: error instanceof Error ? error.message : null,
    isActive: active,
    isMainnet: chainId === 1,
    isRightNetwork,
    connect,
    setError,
    disconnect,
  }
}


export default useConnect
