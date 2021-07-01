import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { store } from 'redux/store'

import MainLayout from 'components/MainLayout/MainLayout'

import '../styles/globals.css'


const getWeb3ReactLibrary = (provider: any) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000

  return library
}

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getWeb3ReactLibrary}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Web3ReactProvider>
  </Provider>
)


export default App
