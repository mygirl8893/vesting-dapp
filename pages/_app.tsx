import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { useEagerConnect } from 'hooks'

import '../styles/globals.scss'


const getWeb3ReactLibrary = (provider, connector) => {
  const lib = new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
  lib.pollingInterval = 12000

  return lib
}

const Inner = ({ children }) => {
  const web3React = useWeb3React()
  const triedEager = useEagerConnect(web3React)

  return children
}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Clearpool</title>
      <meta name="description" content="Clearpool is a decentralized clearing protocol. A smart contract platform where institutions can borrow under-collateralized liquidity and LPs earn attractive rewards." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="icon" href="/static/images/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Web3ReactProvider getLibrary={getWeb3ReactLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  </>
)


export default App
