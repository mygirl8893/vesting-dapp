const checkIsInlineSVGSupported = (): boolean => {
  if (typeof document === 'undefined') {
    return false
  }

  return Boolean(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
}


export default checkIsInlineSVGSupported()
