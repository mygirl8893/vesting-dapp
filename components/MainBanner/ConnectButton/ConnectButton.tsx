import { useState } from 'react'

import ConnectModal from './ConnectModal/ConnectModal'

import s from './ConnectButton.module.scss'


const ConnectButton: React.FunctionComponent = () => {
  const [ isOpenedModal, setOpenedModal ] = useState<boolean>(false)

  const handleOpenModal = () => setOpenedModal(true)
  const handleCloseModal = () => setOpenedModal(false)

  return (
    <>
      <button className={s.button} onClick={handleOpenModal}>
        Connect
      </button>
      {
        isOpenedModal && (
          <ConnectModal
            isOpen={isOpenedModal}
            onClose={handleCloseModal}
          />
        )
      }
    </>
  )
}


export default ConnectButton
