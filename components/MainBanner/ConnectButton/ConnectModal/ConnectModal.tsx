import { useRef, useEffect, useMemo } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { useDispatch, useSelector } from 'react-redux'
import { setMetaMaskData, selectMetaMaskFlags, setMetaMaskLoading, setMetaMaskConnectionError } from 'redux/main'
import Modal from 'react-modal'

import s from './ConnectModal.module.scss'


type ConnectModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ConnectModal: React.FunctionComponent<ConnectModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const onboarding = useRef<any>()

  const {
    isMetaMaskLoading,
    isMetaMaskNeedApproval,
    isMetaMaskConnectionError,
  } = useSelector(selectMetaMaskFlags)

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  const handleInstall = () => {
    dispatch(setMetaMaskLoading(true))

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: any[]) => {
          dispatch(setMetaMaskData(accounts))
          dispatch(setMetaMaskLoading(false))
        })
        .catch(() => {
          dispatch(setMetaMaskConnectionError(true))
          dispatch(setMetaMaskLoading(false))
        })
    } else {
      onboarding.current.startOnboarding()
    }
  }

  const controls = useMemo(() => {
    if (isMetaMaskLoading) {
      return (
        <div className={s.infoText}>
          You have started installing the extension. Complete it and refresh the page.
        </div>
      )
    }

    if (isMetaMaskNeedApproval) {
      return (
        <div className={s.infoText}>
          Go to your MetaMask extension and confirm the connection to the site.
        </div>
      )
    }

    if (isMetaMaskConnectionError) {
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
  }, [ isMetaMaskLoading, isMetaMaskConnectionError, isMetaMaskNeedApproval ])

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
