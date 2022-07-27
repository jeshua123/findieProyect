import { IFormStep } from '../../../models/IFormStep'

import FormCategoryStep from '../../../shared/FormCategoryStep/FormCategoryStep'

const ClientStepOne: React.FC<IFormStep> = (props) => {
  return <FormCategoryStep {...props} currentStep='1' categoriesQuery={props.categoriesQuery} userType='client' />
}

export default ClientStepOne
