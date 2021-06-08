import Head from 'next/head'

import s from './Spread.module.scss'


const Spread: React.FunctionComponent = () => (
  <div className={s.container}>
    <Head>
      <title>Crypto project - Spread</title>
      <meta name="description" content="Crypto project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div>Content: Spread</div>
  </div>
)


export default Spread
