import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectMetaMaskFlags } from 'redux/main'

import MainBanner from 'components/MainBanner/MainBanner'
import HomeControlls from 'components/HomeControlls/HomeControlls'

import s from './index.module.scss'


const Home: React.FunctionComponent = () => {
  const { isMetaMaskConnected } = useSelector(selectMetaMaskFlags)

  return (
    <div className={s.container}>
      <Head>
        <title>Crypto project</title>
        <meta name="description" content="Crypto project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        isMetaMaskConnected ? (
          <HomeControlls />
        ) : (
          <MainBanner />
        )
      }
    </div>
  )
}


export default Home
