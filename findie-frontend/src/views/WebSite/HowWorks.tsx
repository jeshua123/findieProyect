import { useEffect } from 'react'
import useExecuteScroll from '../../customHooks/useExecuteScroll'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import HowWorksIntro from '../../components/WebSite/HowWorks/HowWorksIntro'
import HowWorksSections from '../../components/WebSite/HowWorks/HowWorksSections'

const HowWorks: React.FC = () => {
  const { view, setView } = useWebSiteLayout()
  const freelancerScroll = useExecuteScroll()
  const clientScroll = useExecuteScroll()

  const executeScroll = (ref: string) => {
    const dispatch: { [key: string]: () => void } = {
      freelancer: () => freelancerScroll.execute(),
      client: () => clientScroll.execute(),
    }
    dispatch[ref]()
  }

  useEffect(() => {
    setView({ path: 'how_works', bgColor: 'web-bg-soft-blue', textColor: 'text-white', textColor2: 'text-soft-blue' })
  }, [])

  return (
    <>
      <WebSiteStructure>
        <HowWorksIntro view={view} executeScroll={executeScroll} />
      </WebSiteStructure>
      <div ref={clientScroll.elementRef} />
      <div ref={freelancerScroll.elementRef}>
        <HowWorksSections view={view} />
      </div>
    </>
  )
}

export default HowWorks
