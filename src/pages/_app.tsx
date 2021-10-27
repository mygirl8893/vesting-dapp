import React from 'react'
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

const SafeHydrate = ({ children }) => (
  <div id="hydrateWrapper" suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <SafeHydrate>
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
              app_id: "bj00s8rr"
            };
            
            (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/bj00s8rr';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          `
        }}
      />
    </>
  )
}


export default MyApp
