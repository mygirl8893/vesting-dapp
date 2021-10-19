import { useCallback, useState } from 'react'


export type ParamCallback<T> = (state: Partial<T>) => Partial<T>
export type SetStateParam<T> = Partial<T> | ParamCallback<T>
export type SetState<T> = (param: SetStateParam<T>) => void

const useReducerState = <T extends object>(initialState: T): [ T, SetState<T> ] => {
  const [ state, _setState ] = useState(initialState)

  const setState = useCallback((value) => (
    _setState((prevState) => {
      let newState = value

      if (typeof value === 'function') {
        newState = value(prevState)
      }

      return {
        ...prevState,
        ...newState,
      }
    })
  ), [])

  return [ state, setState ]
}


export default useReducerState
