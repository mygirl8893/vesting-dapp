import React, { forwardRef, useEffect, useCallback, useState } from 'react'

import { isInlineSvgSupported, request } from './util'


type SvgData = {
  body: string
  svgAttributes: object
}

type InlineSvgProps = {
  className?: string
  src: string
  aspect?: number
}

const InlineSvg = forwardRef<SVGSVGElement, InlineSvgProps>((props, ref) => {
  const { className, src, aspect = 1 } = props

  const [ svgData, setSvgData ] = useState<SvgData>(null)

  const handleLoad = useCallback((src) => {
    let isCancelled = false

    request(src)
      .then(
        (svgData) => {
          if (!isCancelled) {
            setSvgData(svgData)
          }
        },
        (error) => console.warn(error)
      )

    // disable calling useState on unmount
    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isInlineSvgSupported) {
      console.warn('InlineSVG: Unsupported browser')
      return
    }

    if (src) {
      return handleLoad(src)
    }

    console.error('InlineSVG: Empty src')
  }, [ src, handleLoad ])

  const { body, svgAttributes } = svgData || {}

  if (body && svgAttributes) {
    return React.createElement('svg', {
      className,
      draggable: false,
      ...svgAttributes,
      dangerouslySetInnerHTML: { __html: body },
    })
  }

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={`0 0 ${aspect} 1`}
    />
  )
})


export default React.memo(InlineSvg)
