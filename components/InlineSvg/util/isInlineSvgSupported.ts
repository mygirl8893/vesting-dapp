const checkIsInlineSVGSupported = (): boolean => {
  if (typeof document === 'undefined') {
    return false
  }

  const div = document.createElement('div')
  div.innerHTML = '<svg />'

  return div.firstChild && div.firstChild.namespaceURI === 'http://www.w3.org/2000/svg'
}

const isInlineSvgSupported = checkIsInlineSVGSupported()


export default isInlineSvgSupported
