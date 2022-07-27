import { useRef, MutableRefObject } from 'react'

type TConfig = {
  behavior?: 'smooth' | 'auto'
  block?: 'start' | 'center' | 'end' | 'nearest'
}

const useExecuteScroll = (config?: TConfig) => {
  const elementRef = useRef() as MutableRefObject<HTMLDivElement>

  const execute = () => {
    elementRef.current.scrollIntoView({
      behavior: config?.behavior ? config.behavior : 'smooth',
      block: config?.block ?? 'center',
    })
  }

  return { elementRef, execute }
}

export default useExecuteScroll
