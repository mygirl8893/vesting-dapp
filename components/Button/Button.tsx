import React from 'react'
import cx from 'classnames'

import s from './Button.module.scss'


export const sizes = [ 30, 40, 48 ] as const

export type ButtonSize = typeof sizes[number]

export type ButtonProps = {
  className?: string
  title: string
  size: ButtonSize
  disabled?: boolean
  fullWidth?: boolean
  onClick?: (event: React.MouseEvent) => void
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { className, title, size, disabled, fullWidth, onClick } = props

  const buttonClassName = cx(
    s.button,
    className,
    s[`size-${size}`],
    {
      [s.disabled]: disabled,
      [s.fullWidth]: fullWidth,
    },
  )

  return (
    <button className={buttonClassName} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  )
}


export default Button

export { default as buttonMessages } from './messages'
