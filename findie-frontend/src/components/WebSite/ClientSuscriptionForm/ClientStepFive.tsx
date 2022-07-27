import { IFormStep } from '../../../models/IFormStep'

import FormStepInputContent from '../../../shared/FormStepInputContent/FormStepInputContent'

const examples = {
  title: 'Una buena descripción incluye',
  options: [
    '• Fecha de inicio y entrega (un aproximado)',
    '• Qué material necesita ser entregado',
    '• Quién será el usuario final ',
    '• Detalles específicos de tu equipo o empresa',
  ],
}

const ClientStepFive: React.FC<IFormStep> = (props) => {
  return (
    <FormStepInputContent
      title='Ahora profundicemos más:'
      name='brief'
      currentStep='5'
      placeholder='Explica con más detalle el objetivo del proyecto.'
      examples={examples}
      {...props}
    />
  )
}

export default ClientStepFive
