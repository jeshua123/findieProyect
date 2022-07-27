import { useState, createContext } from 'react'

export type TView = {
  path: string
  bgColor: string
  textColor: string
  textColor2: string
}

type TCurrentViewContext = {
  view: TView
  setView: (e: TView) => void
}

export const defaultView = {
  path: 'home',
  bgColor: 'web-bg-white',
  textColor: 'text-black',
  textColor2: 'text-white',
}

const CurrentViewContext: React.Context<TCurrentViewContext> = createContext<TCurrentViewContext>({
  view: null!,
  setView: null!,
})

const CurrentViewContextProvider: React.FC = (props) => {
  const [view, setView] = useState<TView>(defaultView)

  return <CurrentViewContext.Provider value={{ view, setView }}>{props.children}</CurrentViewContext.Provider>
}

export { CurrentViewContext, CurrentViewContextProvider }
