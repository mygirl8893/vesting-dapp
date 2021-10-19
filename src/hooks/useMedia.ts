import { useState, useEffect } from 'react'


const getMedia = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  return {
    isMobile: width < 569,
    isTabletPortrait: width > 568 && width < 769,
    isTabletLandscape: width > 768 && width < 1280,
    isTablet: width > 568 && width < 1280,
    isDesktop: width > 1280,
  }
}

const useMedia = () => {
  const [ state, setState ] = useState(getMedia())

  useEffect(() => {
    const handleResize = () => {
      setState(getMedia())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return state
}


export default useMedia
