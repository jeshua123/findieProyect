import { useEffect } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import AboutUsIntro from '../../components/WebSite/AboutUs/AboutUsIntro'
import OurHistory from '../../components/WebSite/AboutUs/OurHistory'
import WhyFindie from '../../components/WebSite/AboutUs/WhyFindie'
import OurMission from '../../components/WebSite/AboutUs/OurMission'
import useExecuteScroll from '../../customHooks/useExecuteScroll'

const AboutUs: React.FC = () => {
  const { view, setView } = useWebSiteLayout()
  const scroll = useExecuteScroll()

  useEffect(() => {
    setView({ path: 'about_us', bgColor: 'web-bg-rose', textColor: 'text-black', textColor2: 'text-rose' })
  }, [])

  return (
    <>
      <WebSiteStructure>
        <AboutUsIntro view={view} executeScroll={scroll.execute} />
      </WebSiteStructure>
      <OurHistory view={view} />
      <WebSiteStructure>
        <WhyFindie view={view} />
        <div ref={scroll.elementRef}>
          <OurMission view={view} />
        </div>
      </WebSiteStructure>
    </>
  )
}

export default AboutUs
