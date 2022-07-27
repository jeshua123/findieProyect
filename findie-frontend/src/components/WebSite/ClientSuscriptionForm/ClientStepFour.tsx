import { IFormStep } from '../../../models/IFormStep'

import FormStepInputContent from '../../../shared/FormStepInputContent/FormStepInputContent'

const examples = {
  title: 'Unos buenos ejemplos son:',
  options: [
    '• Se necesita un logo e imagen corporativa para nueva empresa.',
    '• Se busca un programador para montar una web ecommerce de empresa.',
  ],
}

const ClientStepFour: React.FC<IFormStep> = (props) => {
  return (
    <FormStepInputContent
      title='Démosle un título a tu necesidad:'
      name='title'
      currentStep='4'
      placeholder='Escribe aquí el nombre de tu proyecto.'
      examples={examples}
      {...props}
    />
  )
}

export default ClientStepFour
