import React, { useRef } from 'react'
import { Field, useFieldState } from 'formular'
import cx from 'classnames'

import s from './Input.module.scss'


export type InputProps = {
  className?: string
  field: Field<string | number>
  pattern?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = (props) => {
  const { className, field, pattern, placeholder, disabled, onChange } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const { value, error } = useFieldState<string | number>(field)

  const handleBlur = () => {
    field.validate()
  }

  const handleChange = (event) => {
    let value = event.target.value

    if (pattern && !new RegExp(pattern).test(value)) {
      return
    }

    field.set(value)

    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  const isFilled = value !== ''
  const isErrored = Boolean(error)

  const rootClassName = cx(s.root, className)

  const inputClassName = cx(s.input, {
    [s.filled]: isFilled,
    [s.errored]: isErrored,
    [s.disabled]: disabled,
  })

  return (
    <div className={rootClassName}>
      <input
        className={inputClassName}
        value={value}
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {
        isErrored && (
          <div className={s.error}>{error}</div>
        )
      }
    </div>
  )
}


export default React.memo(Input)
