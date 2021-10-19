import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useFreezeBodyScroll } from 'hooks'
import cx from 'classnames'

import { Overlay } from 'components/layout'
import { Icon } from 'components/ui'

import s from './PlainModal.module.scss'


export type PlainModalProps = {
  className?: string
  overlayClosable?: boolean
  withCloseButton?: boolean
  closeModal: (withOnClose?: boolean) => void
}

const PlainModal: React.FunctionComponent<PlainModalProps> = (props) => {
  const { children, className, overlayClosable = true, withCloseButton = true, closeModal } = props

  useFreezeBodyScroll()

  const handleOverlayClick = useCallback(() => {
    if (overlayClosable) {
      closeModal(true)
    }
  }, [ overlayClosable, closeModal ])

  const handleCloseButtonClick = useCallback(() => {
    closeModal(true)
  }, [ closeModal ])

  const handleModalClick = useCallback((event) => {
    event.stopPropagation()
  }, [])

  const modalClassName = cx(s.plainModal, className)

  return createPortal(
    <Overlay className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.container}>
        <div
          className={modalClassName}
          onClick={handleModalClick}
        >
          {
            withCloseButton && (
              <button
                className={s.closeButton}
                type="button"
                data-testid="closeButton"
                onClick={handleCloseButtonClick}
              >
                <Icon className={s.icon} src="12/dismiss" />
              </button>
            )
          }
          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    </Overlay>,
    document.getElementById('modals')
  )
}


export default PlainModal
