import Head from 'next/head'

import availableWithMetaMask from 'decorators/availableWithMetaMask'

import InfoBlock from './InfoBlock/InfoBlock'

import s from './Claim.module.scss'


const mockData = {
  address: '0xec01cb780202595ce2fb11225aabfad201b54e0f',
  startDate: new Date(),
  endDate: new Date(new Date().setFullYear(2022)),
  vested: 1200.54,
  remainingToVest: 404.77,
  availableToClaim: 1223.55,
  alreadyClaimed: 5492.33,
  totalTokens: 80492.45,
}

const Claim: React.FunctionComponent = () => (
  <div className={s.container}>
    <Head>
      <title>Crypto project - Claim</title>
      <meta name="description" content="Crypto project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <InfoBlock {...mockData} />
  </div>
)


export default availableWithMetaMask(Claim)
