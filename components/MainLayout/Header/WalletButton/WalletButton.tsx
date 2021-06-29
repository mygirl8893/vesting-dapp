import React, { Fragment, useRef, useState, useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Menu, Transition } from '@headlessui/react'
import { shortenAddress } from 'helpers'
import { useEagerConnect, useInactiveListener } from 'hooks'

import Button from 'components/Button/Button'
import InlineSvg from 'components/InlineSvg/InlineSvg'

import ConnectModal from './ConnectModal/ConnectModal'

import s from './WalletButton.module.scss'


const storageKey = 'azuro-btts-disconnected'

const useDisconnected = (web3React) => {
  const { account, deactivate } = web3React

  const [ disconnected, setDisconnected ] = useState(window.localStorage.getItem(storageKey) === 'true')
  const firstRenderRef = useRef<boolean>(true)
  const deactivatedRef = useRef<boolean>(false)

  if (firstRenderRef.current) {
    firstRenderRef.current = false
  }

  useEffect(() => {
    // ATTN should goes first!
    if (account && deactivatedRef.current) {
      window.localStorage.removeItem(storageKey)
      setDisconnected(false)
    }

    if (account && disconnected && !deactivatedRef.current) {
      deactivatedRef.current = true
      deactivate()
    }
  }, [ account ])

  return disconnected
}

const WalletButton = () => {
  const web3React = useWeb3React()

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect(web3React)

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(web3React, !triedEager)

  const { connector, library, chainId, account, activate, deactivate, active, error } = web3React

  const disconnected = useDisconnected(web3React)

  // console.log('connected account:', account)

  // TODO read about web3React errors bubbling - https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#understanding-error-bubbling - added on 6/7/21 by pavelivanov

  const [ isOpened, setOpened ] = useState(false)

  const handleDisconnect = useCallback(() => {
    window.localStorage.setItem(storageKey, 'true')
    deactivate()
  }, [])

  if (!account || disconnected) {
    return (
      <>
        <button
          className={s.walletButton}
          disabled={!triedEager}
          onClick={() => triedEager && setOpened(true)}
        >
          Connect Wallet
        </button>
        <ConnectModal
          isOpen={isOpened}
          onClose={() => setOpened(false)}
        />
      </>
    )
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className={s.walletButton}>
        <div className={s.title}>{shortenAddress(account)}</div>
        <div className={s.arrow}>
          <InlineSvg src="/static/images/arrow-down-24.svg" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={s.dropList}>
          <>
            <div>{account}</div>
            <div>
              <button className={s.logoutButton} onClick={handleDisconnect}>Logout</button>
            </div>
          </>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}


export default WalletButton
