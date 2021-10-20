import React, { Fragment } from 'react'

import s from './Stats.module.scss'


const Stats = ({ isFetching, data, onClaim }) => {
  const { totalTokens, alreadyClaimed, alreadyVested, availableToClaim, remainingToVest } = data || {}



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
    </>
  )
}


export default Stats
