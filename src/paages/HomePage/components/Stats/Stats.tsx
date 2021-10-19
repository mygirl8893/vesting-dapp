import React, { Fragment, useState } from 'react'
import { getContract } from 'contracts'
import { useConnect } from 'web3'
import cx from 'classnames'

import s from './Stats.module.scss'


const Stats = ({ isFetching, data, onClaim }) => {
  const { totalTokens, alreadyClaimed, alreadyVested, availableToClaim, remainingToVest } = data || {}

  const { account } = useConnect()
  const [ isSubmitting, setSubmitting ] = useState(false)

  const stats = [
    {
      title: 'Total tokens',
      value: totalTokens,
    },
    {
      title: 'Already vested',
      value: alreadyVested,
    },
    {
      title: 'Remaining to vest',
      value: remainingToVest,
    },
    {
      title: 'Already claimed',
      value: alreadyClaimed,
    },
    {
      title: 'Available to claim',
      value: availableToClaim,
    },
  ]

  const handleClaimClick = async () => {
    if (!account || !availableToClaim || isSubmitting) {
      return
    }

    try {
      setSubmitting(true)

      const vestingContract = getContract('manualVesting', true)

      const receipt = await vestingContract.claim(account)
      const trx = await receipt.wait()

      setSubmitting(false)
      onClaim()
    }
    catch (err) {
      setSubmitting(false)
      console.error(err)
      alert(err?.message || err)
    }
  }

  return (
    <>
      <div className={s.stats}>
        {
          stats.map(({ title, value }, index) => (
            <Fragment key={title}>
              {
                index > 0 && (
                  <div className={s.divider} />
                )
              }
              <div key={title} className={s.stat}>
                <div className={s.title}>{title}</div>
                {
                  isFetching ? (
                    <div className={s.spinner}>
                      <img src="/images/svg/16/spinner.svg" alt="" />
                    </div>
                  ) : (
                    <div className={s.value}>{value}</div>
                  )
                }
              </div>
            </Fragment>
          ))
        }
      </div>
      <div className={cx(s.claimButton, { [s.disabled]: !availableToClaim })} onClick={handleClaimClick}>
        <span>Claim my CPOOL tokens</span>
        {
          isSubmitting && (
            <img src="/images/svg/16/spinner.svg" alt="" />
          )
        }
      </div>
    </>
  )
}


export default Stats
