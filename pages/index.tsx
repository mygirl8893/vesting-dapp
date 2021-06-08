import Head from 'next/head'

import MainBanner from 'components/MainBanner/MainBanner'

import s from './index.module.scss'


const Home: React.FunctionComponent = () => (
  <div className={s.container}>
    <Head>
      <title>Crypto project</title>
      <meta name="description" content="Crypto project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <MainBanner />
  </div>
)


export default Home
