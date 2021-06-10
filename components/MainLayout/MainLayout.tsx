import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import MetaMaskOnboarding from '@metamask/onboarding'
import { setMetaMaskData, setMetaMaskNeedApproval, setMetaMaskConnectionError } from 'redux/main'

import Header from './Header/Header'
import Footer from './Footer/Footer'

import s from './MainLayout.module.scss'


const MainLayout: React.FunctionComponent = ({ children }) => {
  const [ isLoading, setLoading ] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleNewAccounts = (accounts: string[]) => {
      dispatch(setMetaMaskData(accounts))
      dispatch(setMetaMaskNeedApproval(false))
      setLoading(false)
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      dispatch(setMetaMaskNeedApproval(true))

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)
        .catch(({ code }: any) => {
          if (code === 4001) { // user not aprove connection
            dispatch(setMetaMaskConnectionError(true))
            dispatch(setMetaMaskNeedApproval(false))
            setLoading(false)
          }
        })

      window.ethereum.on('accountsChanged', handleNewAccounts)

      return () => {
        if (typeof window.ethereum.off === 'function') {
          window.ethereum.off('accountsChanged', handleNewAccounts)
        }
      }
    }
    else {
      setLoading(false)
    }
  }, [])

  return (
    <div className={s.container}>
      <header className={s.header}>
        <Header />
      </header>
      <main className={s.content}>
        {!isLoading && children}
      </main>
      <footer className={s.footer}>
        <Footer />
      </footer>
    </div>
  )
}


export default MainLayout
