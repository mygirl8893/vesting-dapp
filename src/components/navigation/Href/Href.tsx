import React from 'react'
import Link from 'next/link'
import cx from 'classnames'


export type HrefProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
  href?: string
  to?: string
  toTab?: string
  mailto?: string
  message?: string
  block?: boolean
  inlineBlock?: boolean
}

const Href: React.FunctionComponent<HrefProps> = (props) => {
  const { children, className, href, to, toTab, mailto, message, block, inlineBlock, ...rest } = props

  const linkClassName = cx(className, {
    'block': block,
    'inline-block': inlineBlock,
  })

  const content = message || children

  if (href) {
    return (
      <a
        className={linkClassName}
        href={href}
        rel="noopener noreferrer nofollow"
        {...rest}
      >
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link href={to} {...rest}>
        <a className={linkClassName}>
          {content}
        </a>
      </Link>
    )
  }

  if (toTab) {
    return (
      <a
        className={linkClassName}
        href={toTab}
        target="_blank"
        rel="noopener noreferrer nofollow"
        {...rest}
      >
        {content}
      </a>
    )
  }

  if (mailto) {
    return (
      <a
        className={linkClassName}
        href={`mailto:${mailto}`}
        {...rest}
      >
        {content || mailto}
      </a>
    )
  }

  return (
    <a
      className={linkClassName}
      {...rest}
    >
      {content}
    </a>
  )
}


export default Href
