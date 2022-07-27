import { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useFreelancerProfileQuery } from '../../customHooks/request/freelancersQuery'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'
import { useSetLoader } from '../../customHooks/useSetLoader'

import SectionStructure from '../../layout/WebSite/SectionStructure'
import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import FreelancerProfileInfo from '../../components/WebSite/FreelancerProfile/FreelancerProfileInfo'

const FreelancerProfile: React.FC = () => {
  const param = useParams<{ id: string }>()
  const { setView } = useWebSiteLayout()
  const freelancersQuery = useFreelancerProfileQuery(param.id)
  useSetLoader(freelancersQuery)

  useEffect(() => {
    setView({ path: 'freelancer_profiles', bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' })
  }, [])

  if (freelancersQuery.isLoading) return null
  if (freelancersQuery.isSuccess && freelancersQuery.data.is_hidden) return <Redirect to='/*' />
  return (
    <WebSiteStructure>
      <SectionStructure>
        {freelancersQuery.isSuccess && <FreelancerProfileInfo freelancer={freelancersQuery.data} />}
      </SectionStructure>
    </WebSiteStructure>
  )
}

export default FreelancerProfile
