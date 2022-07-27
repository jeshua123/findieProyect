import { useState } from 'react'
import { budgetList } from '../../../constants/Cpanel/ProjectConstants'
import useFormSteps from '../../../customHooks/useFormSteps'
import { IUseFormSteps } from '../../../models/IFormStep'
import FormStepContainer from '../../../shared/FormStepContainer/FormStepContainer'

import SpecialSelect from '../../../shared/SpecialSelect.tsx/SpecialSelect'

const ClientStepSix: React.FC<IUseFormSteps> = (props) => {
  const { form } = useFormSteps({ ...props })
  const [selectedBudget, setSelectedBudget] = useState<string>('')

  return (
    <FormStepContainer>
      <div className='h-80'>
        <p className={`formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 mb-12 text-white`}>{props.title}</p>

        <SpecialSelect
          options={budgetList}
          name={props.name}
          form={form}
          selectedOption={selectedBudget}
          setSelectedOption={setSelectedBudget}
          setTheme={props.setTheme}
          boxSeparation='top-20'
        />
      </div>
    </FormStepContainer>
  )
}

export default ClientStepSix
