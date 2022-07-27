import { useMemo } from 'react'
import { usePlansQuery } from '../../../customHooks/request/plansQuery'
import { IPlan } from '../../../models/IPlan'
import { IFormStep } from '../../../models/IFormStep'

import FormStepOptionsContent from '../../../shared/FormStepOptionsContent/FormStepOptionsContent'

const ClientStepThree: React.FC<IFormStep> = (props) => {
  const plansQuery = usePlansQuery({ entity: 'client' })

  const plans = useMemo(() => {
    if (plansQuery.isSuccess) {
      const plansList = plansQuery.data
        .filter((plan: IPlan) => plan.is_available && !plan.is_secret)
        .map((plan: IPlan) => {
          return { value: plan._id, label: plan.name, comment: plan.comment }
        })
      return plansList
    }
  }, [plansQuery.data])

  return (
    <FormStepOptionsContent
      name='plan'
      title='¿Qué tipo de plan te interesaría tomar?'
      options={plans ?? []}
      currentStep='3'
      {...props}
      withComments
    />
  )
}

export default ClientStepThree
