import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { usePublicFreelancersQuery } from '../../customHooks/request/freelancersQuery'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import FreelancersProfilesList from '../../components/WebSite/FreelancersProfiles/FreelancersProfilesList'
import SectionStructure from '../../layout/WebSite/SectionStructure'
import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import { useSetLoader } from '../../customHooks/useSetLoader'

const FreelancersProfiles: React.FC = () => {
  const param = useParams<{ categoryId: string }>()
  const { setView } = useWebSiteLayout()
  const [categorySelected, setCategorySelected] = useState<string>(param.categoryId)
  const freelancersQuery = usePublicFreelancersQuery({ 'featured_status.is_featured': true, category: categorySelected })
  useSetLoader(freelancersQuery)

  useEffect(() => {
    setView({ path: 'freelancer_profiles', bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' })
  }, [])

  return (
    <WebSiteStructure>
      <SectionStructure>
        <FreelancersProfilesList
          profiles={freelancersQuery}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
      </SectionStructure>
    </WebSiteStructure>
  )
}

export default FreelancersProfiles
