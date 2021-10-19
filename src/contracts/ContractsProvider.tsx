import React, { useState, useEffect, useRef } from 'react'
import { useConnect } from 'web3'

import createContracts from './createContracts'
import state from './state'


const ContractsProvider = ({ children }) => {
  const { library } = useConnect()
  const isRunned = useRef<boolean>()
  const [ isLoading, setLoading ] = useState(true)

  useEffect(() => {
    console.log('build read contracts')
    createContracts()
    setLoading(false)
  }, [])

  if (!isRunned.current && library) {
    console.log('build write contracts')
    state.walletProvider = library
    createContracts(true)
    isRunned.current = true
  }

  if (isLoading) {
    return 'loading...' // TODO add loader - added on 8/16/21 by pavelivanov
  }

  return children
}


export default ContractsProvider
