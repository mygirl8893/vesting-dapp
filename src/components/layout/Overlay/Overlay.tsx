import React, { useRef, useEffect } from 'react'
import cx from 'classnames'

import s from './Overlay.module.scss'


export type OverlayProps = {
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Overlay: React.FunctionComponent<OverlayProps> = ({ children, className, onClick }) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    // ATTN this workaround required to fix transition animation glitch (elements jumping from top to down when moving)
    //  timeout means that animation is finished
    const timer = setTimeout(() => {
      ref.current.classList.add(s.mounted)
    }, 400)

    return () => {
      clearTimeout(timer)
    }
  })

  return (
    <div ref={ref} className={cx(s.overlay, className)} onClick={onClick}>
      {children}
    </div>
  )
}


export default Overlay
