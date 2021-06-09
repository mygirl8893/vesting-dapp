import { useState, useRef, useEffect } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { useSelector, useDispatch } from 'react-redux'
import { selectMetaMaskConnected, setMetaMaskConnectedStatus, setMetaMaskAccounts } from 'redux/main'
import Modal from 'react-modal'

import s from './ConnectModal.module.scss'


type ConnectModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ConnectModal: React.FunctionComponent<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [ isDisabled, setDisabled ] = useState<boolean>(false)
  const [ isLoading, setLoading ] = useState<boolean>(true)
  const [ accounts, setAccounts ] = useState<string[]>([])

  const dispatch = useDispatch()
  const isMetaMaskConnected = useSelector(selectMetaMaskConnected)

  const onboarding = useRef<any>()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        dispatch(setMetaMaskConnectedStatus(!isMetaMaskConnected))
        dispatch(setMetaMaskAccounts(accounts))
        setDisabled(true)
        onboarding.current.stopOnboarding()
      } else {
        setDisabled(false)
        setLoading(false)
      }
    }
  }, [ accounts ])

  useEffect(() => {
    const handleNewAccounts = (newAccounts: string[]) => {
      setAccounts(newAccounts)
      setLoading(false)
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)

      window.ethereum.on('accountsChanged', handleNewAccounts)

      return () => {
        if (typeof window.ethereum.off === 'function') {
          window.ethereum.off('accountsChanged', handleNewAccounts)
        }
      }
    }
  }, [])

  const handleInstall = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts: any[]) => setAccounts(newAccounts))
    } else {
      onboarding.current.startOnboarding()
    }
  }

  return (
    <Modal 
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className={s.modal}
        overlayClassName={s.overlay}
    >
      {
        isLoading ? (
          <div className={s.loader}>
            <div className={s.loaderWheel}></div>
            <div className={s.loaderText}></div>
          </div>
        ) : (
        <>
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
          <div className={s.controls}>
            <button disabled={isDisabled} onClick={handleInstall}>
              Install MetaMask
            </button>
            <button onClick={onClose}>
              Close
            </button>
          </div>
        </>
        )
      }
    </Modal>
  )
}


export default ConnectModal
