import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import localStorageNames from 'constants/localStorageNames'
import { formatEther } from '@ethersproject/units'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Modal from 'react-modal'

import s from './AccountModal.module.scss'


type AccountModalProps = {
  isOpen: boolean
  onClose: () => void
}

const formatBalance = (value: string) => {
  let [ whole, decimal ] = value.split('.')

  if (!decimal) return whole

  decimal = decimal.length > 3 ? decimal.substring(0, 3) : decimal

  return `${whole}.${decimal}`
}

const AccountModal: React.FunctionComponent<AccountModalProps> = ({ isOpen, onClose }) => {
  const { account, library, chainId, deactivate } = useWeb3React<Web3Provider>()

  const [ balance, setBalance ] = useState<string>("")
  const [ networkName, setNetworkName ] = useState<string>("")

  const handleDeactivate = () => {
    window.localStorage.setItem(localStorageNames.deactivated, 'true')
    deactivate()
  }

  useEffect(() => {
    if (library && account) {
      library.getBalance(account).then((balance) => setBalance(formatBalance(formatEther(balance))))
      library.getNetwork().then(({ name }) => setNetworkName(name))
    }
  }, [ account, chainId ])

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <div className={s.container}>
        <div className={s.title}>Account</div>
        <div className={s.info}>
          <div className={s.infoBox}>
            <span>Balance</span>
            <b>{`${balance} ETH`}</b>
          </div>
          <div className={s.infoBox}>
            <span>Network</span>
            <b>{networkName}</b>
          </div>
          <div className={s.infoBox}>
            <span>Network</span>
            <b>{library?.connection?.url}</b>
          </div>
        </div>
        <div className={s.account}>
          {account}
        </div>
        <div className={s.controlls}>
          <div className={s.action}>
            <CopyToClipboard text={account}>
              <span>Copy Address</span>
            </CopyToClipboard>
          </div>
          <div className={s.action} onClick={handleDeactivate}>
            Disconnect
          </div>
        </div>
      </div>
    </Modal>
  )
}


export default AccountModal
