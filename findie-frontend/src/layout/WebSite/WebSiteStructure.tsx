import { PropsWithChildren } from 'react'

type TWebSiteStructure = {
  className?: string
}

const WebSiteStructure: React.FC<TWebSiteStructure> = (props: PropsWithChildren<any>) => {
  return (
    <div className={`web-site-grid ${props.className}`}>
      <div className='' />
      <div>{props.children}</div>
      <div className='' />
    </div>
  )
}

export default WebSiteStructure
