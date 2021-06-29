import { useState, useEffect } from 'react'
import { connectors } from 'helpers'


const useEagerConnect = (web3React) => {
  const { activate, active } = web3React

  const [ tried, setTried ] = useState(false)

  useEffect(() => {
    if (active) {
      return
    }

    connectors.injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(connectors.injected, undefined, true).catch(() => {
          setTried(true)
        })
      }
      else {
        setTried(true)
      }
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [ tried, active ])

  return tried
}


export default useEagerConnect
