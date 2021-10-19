import { useState, useEffect } from 'react'

import { subscribe, unsubscribe } from './manager'


type State<TProps> = {
  isVisible: boolean
  props?: TProps
}

const useModalVisibility = <TProps extends {}>(modalName: string): State<TProps> => {
  const [ state, setState ] = useState<State<TProps>>({ isVisible: false, props: undefined })

  useEffect(() => {
    subscribe(modalName, (isVisible, props?: TProps) => {
      setState({ isVisible, props })
    })

    return () => {
      unsubscribe(modalName)
      setState({ isVisible: false, props: undefined })
    }
  }, [ modalName ])

  return state
}


export default useModalVisibility
