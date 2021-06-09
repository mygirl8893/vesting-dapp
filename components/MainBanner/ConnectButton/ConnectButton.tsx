import { useState, useRef, useEffect } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { useSelector, useDispatch } from 'react-redux'
import { selectMetaMaskConnected, setMetaMaskConnectedStatus, setMetaMaskAccounts } from 'redux/main'
import Modal from 'react-modal'

import s from './ConnectButton.module.scss'


const ConnectButton: React.FunctionComponent = () => {
  const [ isOpenedModal, setOpenedModal ] = useState<boolean>(false)
  const [ isDisabled, setDisabled ] = useState<boolean>(false)
  const [ accounts, setAccounts ] = useState<string[]>([])

  const dispatch = useDispatch()
  const isMetaMaskConnected = useSelector(selectMetaMaskConnected)

  const onboarding = useRef<any>();

  const handleOpenModal = () => setOpenedModal(true)
  const handleCloseModal = () => setOpenedModal(false)

  const handleInstall = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts: any[]) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding()
    }
  }

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        dispatch(setMetaMaskConnectedStatus(!isMetaMaskConnected))
        dispatch(setMetaMaskAccounts(accounts))
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setDisabled(false);
      }
    }
  }, [ accounts ]);

  useEffect(() => {
    const handleNewAccounts = (newAccounts: string[]) => {
      setAccounts(newAccounts)
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)

      window.ethereum.on('accountsChanged', handleNewAccounts);

      return () => {
        console.log('window.ethereum', window.ethereum)
        if (typeof window.ethereum.off === 'function') {
          window.ethereum.off('accountsChanged', handleNewAccounts)
        }
      };
    }
  }, []);

  return (
    <>
      <button onClick={handleOpenModal}>
        Connect
      </button>
      <Modal 
          isOpen={isOpenedModal}
          onRequestClose={handleCloseModal}
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
        <div className={s.controls}>
          <button disabled={isDisabled} onClick={handleInstall}>
            Install MetaMask
          </button>
          <button onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </Modal>
    </>
  )
}


export default ConnectButton
