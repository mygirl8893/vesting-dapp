import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ContractsProvider } from 'contracts'
import { Connector } from 'web3'

import '../scss/globals.scss'
import '../scss/date-picker.scss'


const getWeb3ReactLibrary = (provider, connector) => {
  const lib = new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
  lib.pollingInterval = 12000

  return lib
}

const title = 'Clearpool - Vesting'
const description = 'Revolutionizing debt capital markets. A paradigm shift in how institutions borrow uncollateralized liquidity is upon us. Sign up below to stay ahead of the game.'

const SafeHydrate = ({ children }) => (
  <div id="hydrateWrapper" suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

const MyApp = ({ Component, pageProps }) => {

  return (
    <SafeHydrate>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="og:url" content={`https://vesting.clearpool.finance`} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <Script type="text/javascript" src="/js/css-variables.js" />
      <Web3ReactProvider getLibrary={getWeb3ReactLibrary}>
        <ContractsProvider>
          <Connector>
            <Component {...pageProps} />
            <div id="modals" />
          </Connector>
        </ContractsProvider>
      </Web3ReactProvider>
    </SafeHydrate>
  )
}


export default MyApp
