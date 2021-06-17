import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getInfo, Info } from 'helpers/contract'
import { useSelector } from 'react-redux'
import { selectMetaMaskAccounts } from 'redux/main'

import availableWithMetaMask from 'decorators/availableWithMetaMask'

import InfoBlock from './InfoBlock/InfoBlock'

import s from './Claim.module.scss'


type State = {
  data: null | Info,
  isFetching: boolean,
  error: null | string,
}

const Claim: React.FunctionComponent = () => {
  const [ address ] = useSelector(selectMetaMaskAccounts)

  const [ state, setState ] = useState<State>({
    data: null,
    isFetching: true,
    error: null,
  }) 

  useEffect(() => {
    getInfo(address)
      .then((data) => {
        setState((state) => ({
          ...state,
          data,
          isFetching: false,
        }))
      })
      .catch((error: any) => {
        console.log(error)

        setState((state) => ({
          ...state,
          error: error.message,
          isFetching: false,
        }))
      })
  }, [ address ])

  return (
    <div className={s.container}>
      <Head>
        <title>Crypto project - Claim</title>
        <meta name="description" content="Crypto project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InfoBlock {...state.data} />
    </div>
  )
}


export default availableWithMetaMask(Claim)
