import { useEffect } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import HomePageIntro from '../../components/WebSite/HomePage/HomePageIntro'
import OurCategories from '../../components/WebSite/HomePage/OurCategories'
import RoadMap from '../../components/WebSite/HomePage/RoadMap'
import FeaturedFreelancers from '../../components/WebSite/HomePage/FeaturedFreelancers'
import FreelancersBrands from '../../components/WebSite/HomePage/FreelancersBrands'
import WhyChooseUs from '../../components/WebSite/HomePage/WhyChooseUs'
import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'

const HomePage: React.FC = () => {
  const { view, setView } = useWebSiteLayout()

  useEffect(() => {
    setView({ path: 'home', bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' })
  }, [])

  return (
    <div>
      <WebSiteStructure>
        <HomePageIntro view={view} />
        <OurCategories view={view} />
        <RoadMap view={view} />
      </WebSiteStructure>
      <FeaturedFreelancers view={view} />
      <WebSiteStructure>
        <FreelancersBrands view={view} />
      </WebSiteStructure>
      <WhyChooseUs view={view} />
    </div>
  )
}

export default HomePage
