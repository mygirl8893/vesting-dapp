import React from 'react'

import ConnectModal from 'compositions/modals/ConnectModal/ConnectModal'

import Header from './components/Header/Header'
import Content from './components/Content/Content'


const HomePage = () => {

  return (
    <>
      <Header />
      <Content />
      <ConnectModal />
    </>
  )
}


export default HomePage
