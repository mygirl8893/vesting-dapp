import Head from 'next/head'

import SpreadForm from './SpreadForm/SpreadForm'

import s from './Spread.module.scss'


const Spread: React.FunctionComponent = () => (
  <div className={s.container}>
    <Head>
      <title>Crypto project - Spread</title>
      <meta name="description" content="Crypto project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SpreadForm />
  </div>
)


export default Spread
