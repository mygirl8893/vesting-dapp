import { useState, useCallback } from 'react'


const useForceUpdate = () => {
  const [ _, setState ] = useState({})

  return useCallback(() => {
    setState({})
  }, [])
}


export default useForceUpdate
