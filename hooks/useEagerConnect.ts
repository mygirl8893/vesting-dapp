import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from 'helpers/connectors'
import localStorageNames from 'constants/localStorageNames'


const useEagerConnect = () => {
  const { activate, active, connector } = useWeb3React()

  const [ tried, setTried ] = useState(false)

  useEffect(() => {
    const isDeactivated = window.localStorage.getItem(localStorageNames.deactivated) === 'true'

    if (isDeactivated) {
      setTried(true)
      return
    }

    injected.isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true)
            .catch(() => setTried(true))
        } else {
          setTried(true)
        }
      })
  }, [])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [ tried, active ])

  return tried
}


export default useEagerConnect
