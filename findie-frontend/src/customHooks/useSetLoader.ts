import { useEffect, useContext } from 'react'
import { LoaderContext } from '../context/LoaderContext'

export const useSetLoader = (request?: any) => {
  const loader = useContext(LoaderContext)

  useEffect(() => {
    request && loader.setIsOpen(request.isLoading)
  }, [request?.isLoading])

  return loader
}
