import { useState, useEffect } from 'react'

function getIsPortrait() {
  return window.innerHeight > window.innerWidth
}

export function useScreenOrientation() {
  const [isPortrait, setIsPortrait] = useState(getIsPortrait())

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(getIsPortrait())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isPortrait }
}
