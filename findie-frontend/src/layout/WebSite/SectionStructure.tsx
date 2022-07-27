import { PropsWithChildren, MutableRefObject } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

type TSectionStructure = {
  className?: string
  id?: string
  ref?: MutableRefObject<HTMLDivElement>
}

const SectionStructure: React.FC<TSectionStructure> = (props: PropsWithChildren<any>) => {
  const { view } = useWebSiteLayout()

  return (
    <div className={`md:py-24 py-16 lg:px-0 md:px-12 px-7 ${props.className} ${view.textColor}`} id={props.id} ref={props.ref}>
      {props.children}
    </div>
  )
}

export default SectionStructure
