import { IFormStep } from '../../../models/IFormStep'

import FormSkillsStep from '../../../shared/FormSkillsStep/FormSkillsStep'

const ClientStepTwo: React.FC<IFormStep> = (props) => {
  return <FormSkillsStep {...props} theme='blue' currentStep='2' userType='client' />
}

export default ClientStepTwo
