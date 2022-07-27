// @ts-nocheck
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToTop = (containerId: string) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/' && document.getElementById(containerId)) {
      document.getElementById(containerId).scrollTo(0, 0)
    }
  }, [pathname])
}
