import React from 'react'
import cx from 'classnames'

import type { IconName } from './icons'

import { InlineSvg } from 'components/ui'

import s from './Icon.module.scss'


export const colors = [
  'black',
] as const

export type IconColor = typeof colors[number]

type IconProps = {
  className?: string
  src: IconName
  color?: IconColor
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { className, src, color } = props

  const [ size, name ] = src.split('/')

  const rootClassName = cx(s.icon, className, s[name], {
    [s[`size-${size}`]]: /^[0-9]+$/.test(size),
    [`text-${color}`]: color,
  })

  return (
    <InlineSvg
      className={rootClassName}
      src={`/images/svg/${src}.svg`}
    />
  )
}


export default Icon
