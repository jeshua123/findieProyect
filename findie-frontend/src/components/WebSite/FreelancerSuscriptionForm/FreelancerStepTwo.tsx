import { IFormStep } from '../../../models/IFormStep'

import FormSkillsStep from '../../../shared/FormSkillsStep/FormSkillsStep'

const FreelancerStepTwo: React.FC<IFormStep> = (props) => {
  return <FormSkillsStep {...props} currentStep='2' userType='freelancer' />
}

export default FreelancerStepTwo
