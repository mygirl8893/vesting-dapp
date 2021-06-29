import React, { useState, useCallback, useEffect } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { connectors } from 'helpers'
import Modal from 'react-modal'
import cx from 'classnames'

import InlineSvg from 'components/InlineSvg/InlineSvg'

import s from './ConnectModal.module.scss'


enum ConnectorNames {
  Injected = 'Injected',
}

const connectorsByName: { [connectorName in ConnectorNames]: { icon: string, title: string, connector: any } } = {
  [ConnectorNames.Injected]: {
    icon: '/static/images/metamask.svg',
    title: 'Metamask',
    connector: connectors.injected,
  },
}

const getErrorMessage = (error: Error) => {
  if (!error) {
    return
  }

  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  }

  if (error instanceof UnsupportedChainIdError) {
    return 'You\'re connected to an unsupported network.'
  }

  if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.'
  }

  console.error(error)

  return 'An unknown error occurred. Check the console for more details.'
}

type ButtonProps = {
  icon: string
  title: string
  connector: any
  disabled: boolean
  onClick: (connector: any) => void
}

let Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { icon, title, connector, disabled, onClick } = props

  const handleClick = () => {
    onClick(connector)
  }

  return (
    <button className={s.button} disabled={disabled} onClick={handleClick}>
      <span className="text-18-28 font-bold text-color-1">{title}</span>
      <InlineSvg className={s.icon} src={icon} />
    </button>
  )
}

Button = React.memo(Button)

const ConnectModal = (props) => {
  const { isOpen, onClose } = props

  const [ activatingConnector, setActivatingConnector ] = useState(false)

  const web3React = useWeb3React()

  const web3ReactError = getErrorMessage(web3React.error)

  // the code commented because if user closes MetaMask connection modal when he isn't able to press the button again
  const disabled = Boolean(activatingConnector) // Boolean(activatingConnector || web3ReactError)

  useEffect(() => {
    if (web3React.connector) {
      setActivatingConnector(false)
    }
  }, [ web3React.connector ])

  const handleButtonClick = useCallback((connector) => {
    setActivatingConnector(connector)
    web3React.activate(connector)
  }, [])

  return (
    <Modal
      className={s.modal}
      overlayClassName={s.overlay}
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="text-32-44 text-color-1 font-bold text-center">
        Connect Wallet
      </div>
      <div className="mb-56 text-14-20 text-color-2 text-center">
        Please, connect wallet to start using Clearpool
      </div>
      {
        Boolean(web3ReactError) && (
          <div className="mb-24 text-14-20 text-color-red">{web3ReactError}</div>
        )
      }
      <div>
        {
          Object.keys(connectorsByName).map((name) => {
            const { icon, title, connector } = connectorsByName[name]

            return (
              <Button
                key={title}
                icon={icon}
                title={title}
                connector={connector}
                disabled={disabled}
                onClick={handleButtonClick}
              />
            )
          })
        }
      </div>
      <div className={cx(s.note, 'mt-32 text-14-20 text-color-3 text-center')}>
        By connecting a wallet, you agree to<br /><a href="/terms" target="_blank">Clearpool’ Terms of Service</a>
      </div>
    </Modal>
  )
}


export default ConnectModal
