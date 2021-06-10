import { useState, useRef, useEffect, useMemo } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { useDispatch } from 'react-redux'
import { setMetaMaskData } from 'redux/main'
import Modal from 'react-modal'

import s from './ConnectModal.module.scss'


type ConnectModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ConnectModal: React.FunctionComponent<ConnectModalProps> = ({ isOpen, onClose }) => {
  const onboarding = useRef<any>()
  const [ isLoading, setLoading ] = useState<boolean>(false)
  const [ isNeedApproval, setNeedApproval ] = useState<boolean>(false)
  const [ isConnectionError, setConnectionError ] = useState<boolean>(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    const handleNewAccounts = (accounts: string[]) => {
      dispatch(setMetaMaskData(accounts))
      setNeedApproval(false)
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setNeedApproval(true)

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)
        .catch(({ code }: any) => {
          if (code === 4001) { // user not aprove connection
            setConnectionError(true)
            setNeedApproval(false)
          }
        })

      window.ethereum.on('accountsChanged', handleNewAccounts)

      return () => {
        if (typeof window.ethereum.off === 'function') {
          window.ethereum.off('accountsChanged', handleNewAccounts)
        }
      }
    }
  }, [])

  const handleInstall = () => {
    setLoading(true)

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: any[]) => {
          dispatch(setMetaMaskData(accounts))
          setLoading(false)
        })
        .catch(() => {
          setConnectionError(true)
          setLoading(false)
        })
    } else {
      onboarding.current.startOnboarding()
    }
  }

  const controls = useMemo(() => {
    if (isLoading) {
      return (
        <div className={s.infoText}>
          You have started installing the extension. Complete it and refresh the page.
        </div>
      )
    }

    if (isNeedApproval) {
      return (
        <div className={s.infoText}>
          Go to your MetaMask extension and confirm the connection to the site.
        </div>
      )
    }

    if (isConnectionError) {
      return (
        <>
          <div className={s.errorText}>
            Connection error
          </div>
          <div className={s.controls}>
            <button onClick={handleInstall}>
              Try again
            </button>
            <button onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )
    }

    return (
      <div className={s.controls}>
        <button onClick={handleInstall}>
          Install MetaMask
        </button>
        <button onClick={onClose}>
          Close
        </button>
      </div>
    )
  }, [ isLoading, isConnectionError, isNeedApproval ])

  return (
    <Modal 
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className={s.modal}
        overlayClassName={s.overlay}
    >
      <div className={s.title}>
        Select a Wallet
      </div>
      <div className={s.metaMask}>
        <div className={s.metaMaskLogo} />
        <div className={s.metaMaskTitle}>
          MetaMask
        </div>
      </div>
      <div className={s.note}>
        You'll need to install <b>MetaMask</b> to continue. <br />
        Once you have it installed, go ahead and <b>refresh the page</b>.
      </div>
      {controls}
    </Modal>
  )
}


export default ConnectModal
