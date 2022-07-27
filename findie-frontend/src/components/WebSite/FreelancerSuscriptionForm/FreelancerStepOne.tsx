import { IFormStep } from '../../../models/IFormStep'

import FormCategoryStep from '../../../shared/FormCategoryStep/FormCategoryStep'

const FreelancerStepOne: React.FC<IFormStep> = (props) => {
  return <FormCategoryStep {...props} currentStep='1' userType='freelancer' />
}

export default FreelancerStepOne
