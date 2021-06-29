import React from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'

type AvailableWithMetaMask = <T>(ComposedComponent: any) => React.FunctionComponent<T>

const availableWithMetaMask: AvailableWithMetaMask = (ComposedComponent?) => {

  const WrappedComponent = (props: any) => {
    const router = useRouter()
    const { account } = useWeb3React()

    // if (!account) {
    //   router.push('/')
    //
    //   return null
    // }

    return (
      <ComposedComponent {...props} />
    )
  }

  return React.memo(WrappedComponent)
}


export default availableWithMetaMask
