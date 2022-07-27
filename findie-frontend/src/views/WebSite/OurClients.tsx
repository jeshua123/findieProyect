import { useEffect, MutableRefObject, useRef } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import OurClientsIntro from '../../components/WebSite/OurClients/OurClientsIntro'
import HowClientsWorks from '../../components/WebSite/OurClients/HowClientsWorks'
import ClientPrices from '../../components/WebSite/OurClients/ClientPrices'
import useExecuteScroll from '../../customHooks/useExecuteScroll'

const OurClients: React.FC = () => {
  const { view, setView } = useWebSiteLayout()
  const scroll = useExecuteScroll()

  useEffect(() => {
    setView({ path: 'our_clients', bgColor: 'web-bg-sea-blue', textColor: 'text-white', textColor2: 'text-sea-blue' })
  }, [])

  return (
    <WebSiteStructure>
      <OurClientsIntro view={view} scroll={scroll} />
      <HowClientsWorks view={view} />

      <div ref={scroll.elementRef}>
        <ClientPrices view={view} />
      </div>
    </WebSiteStructure>
  )
}

export default OurClients
