import { useEffect } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import OurFreelancersIntro from '../../components/WebSite/OurFreelancers/OurFreelancersIntro'
import WhatYouGet from '../../components/WebSite/OurFreelancers/WhatYouGet'
import WhatFreelancersWin from '../../components/WebSite/OurFreelancers/WhatFreelancersWin'
import FreelancersPrices from '../../components/WebSite/OurFreelancers/FreelancersPrices'
import FreelancersAwards from '../../components/WebSite/OurFreelancers/FreelancersAwards'

const OurFreelancers: React.FC = () => {
  const { view, setView } = useWebSiteLayout()

  useEffect(() => {
    setView({ path: 'our_freelancers', bgColor: 'web-bg-light-orange', textColor: 'text-black', textColor2: 'text-light-orange' })
  }, [])

  return (
    <WebSiteStructure>
      <OurFreelancersIntro view={view} />
      <WhatYouGet view={view} />
      <WhatFreelancersWin view={view} />
      <FreelancersPrices view={view} />
      <FreelancersAwards view={view} />
    </WebSiteStructure>
  )
}

export default OurFreelancers
