import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectMetaMaskFlags } from 'redux/main'

type AvailableWithMetaMask = <T>(ComposedComponent: any) => React.FunctionComponent<T>

const availableWithMetaMask: AvailableWithMetaMask = (ComposedComponent?) => {

  const WrappedComponent = (props: any) => {
    const router = useRouter()
    const { isMetaMaskConnected } = useSelector(selectMetaMaskFlags)

    if (!isMetaMaskConnected) {
      router.push('/')

      return null
    }

    return (
      <ComposedComponent {...props} />
    )
  }

  return React.memo(WrappedComponent)
}


export default availableWithMetaMask
