import React, { useCallback } from 'react'

import useModalVisibility from './useModalVisibility'
import { closeModal } from './manager'


export type ModalVisibilityProps = {
  closeModal: (withOnClose?: boolean) => void
  onClose: never
}

const checkSameProps = (modalName, componentProps = {}, actionProps = {}) => {
  const samePropKeys = []

  Object.keys(componentProps).forEach((componentPropKey) => {
    if (componentPropKey in actionProps) {
      samePropKeys.push(componentPropKey)
    }
  })

  if (samePropKeys.length) {
    if (process.env.LOCALTEST || process.env.WEBPACK === 'dev') {
      throw new Error(`Same prop keys used in Component and openModal for "${modalName}" modal: ${JSON.stringify(samePropKeys)}`)
    }
    else {
      console.warn('Same prop keys used in Component and openModal', {
        extra: {
          modalName,
          samePropKeys,
        },
      })
    }
  }
}

const modalVisibility = <Props extends {}>(name: string, ComposedComponent) => {

  const WrappedComponent: React.FunctionComponent<Props> = (componentProps) => {
    const { isVisible, props: actionProps } = useModalVisibility<Props>(name)

    const { onClose: componentOnClose } = componentProps as any
    const { onClose: actionOnClose } = (actionProps || {}) as any

    const onClose = actionOnClose || componentOnClose

    checkSameProps(name, componentProps, actionProps)

    const handleCloseModal = useCallback((withOnClose) => {
      closeModal(name)

      // ATTN we should check for "true" bcs smbd can write onClick: closeModal and pass "event" value in "withOnClose"
      if (withOnClose === true && typeof onClose === 'function') {
        onClose()
      }
    }, [ name, onClose ])

    return isVisible && (
      <ComposedComponent
        {...componentProps}
        {...actionProps}
        closeModal={handleCloseModal}
      />
    )
  }

  WrappedComponent.displayName = `modalVisibility(${ComposedComponent.displayName || ComposedComponent.name})`

  return React.memo(WrappedComponent)
}


export default modalVisibility
