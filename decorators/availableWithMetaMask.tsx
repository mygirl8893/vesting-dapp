import React from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { ownerAddress } from 'contracts'

type AvailableWithMetaMask = <T>(ComposedComponent: any, ownerOnly?: boolean) => React.FunctionComponent<T>

const availableWithMetaMask: AvailableWithMetaMask = (ComposedComponent?, ownerOnly?) => {

  const WrappedComponent = (props: any) => {
    const router = useRouter()
    const { account } = useWeb3React()

    // if (!account) {
    //   router.push('/')
    //
    //   return null
    // }

    if (ownerOnly && account !== ownerAddress) {
      return null
    }

    return (
      <ComposedComponent {...props} />
    )
  }

  return React.memo(WrappedComponent)
}


export default availableWithMetaMask
