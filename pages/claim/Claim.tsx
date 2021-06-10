import Head from 'next/head'

import availableWithMetaMask from 'decorators/availableWithMetaMask'

import s from './Claim.module.scss'


const Claim: React.FunctionComponent = () => (
  <div className={s.container}>
    <Head>
      <title>Crypto project - Claim</title>
      <meta name="description" content="Crypto project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div>Content: Claim</div>
  </div>
)


export default availableWithMetaMask(Claim)
