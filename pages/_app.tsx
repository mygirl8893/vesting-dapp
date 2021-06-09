import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'

import MainLayout from 'components/MainLayout/MainLayout'

import '../styles/globals.css'


const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </Provider>
)


export default App
