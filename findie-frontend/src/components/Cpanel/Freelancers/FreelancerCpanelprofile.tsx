import { UseMutationResult, UseQueryResult } from 'react-query'
import { IFreelancer } from '../../../models/IFreelancer'

import FreelancerStudiesAndExperiences from './FreelancerStudiesAndExperiences'
import FreelancerAditionalInfo from './FreelancerAditionalInfo'

import { Box } from '@material-ui/core'
import FreelancerFindiePortfolio from './FreelancerFindiePortfolio'

type TFreelancerCpanelprofile = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  putFreelancerMutation: UseMutationResult<{ data: IFreelancer }, unknown, { body: Partial<IFreelancer>; _id: string }, unknown>
  afterFreelancerMutation: () => void
}

const FreelancerCpanelprofile: React.FC<TFreelancerCpanelprofile> = (props) => {
  const componentsProps = {
    freelancerId: props.freelancerId,
    freelancer: props.freelancer,
    isInputsDisabled: props.isInputsDisabled,
    putFreelancerMutation: props.putFreelancerMutation,
    afterFreelancerMutation: props.afterFreelancerMutation,
  }

  return (
    <Box className='mt-2'>
      <FreelancerAditionalInfo {...componentsProps} />
      <FreelancerStudiesAndExperiences {...componentsProps} />
      <FreelancerFindiePortfolio
        freelancerId={props.freelancerId}
        freelancer={props.freelancer}
        afterFreelancerMutation={props.afterFreelancerMutation}
      />
    </Box>
  )
}

export default FreelancerCpanelprofile
