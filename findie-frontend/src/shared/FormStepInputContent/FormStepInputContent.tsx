import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { IUseFormSteps } from '../../models/IFormStep'

import FormStepContainer from '../FormStepContainer/FormStepContainer'

import InputField from '../../assets/UIkit/Forms/InputField'
import useFormSteps from '../../customHooks/useFormSteps'

const FormStepInputContent: React.FC<IUseFormSteps> = (props) => {
  const { form } = useFormSteps({ ...props })

  return (
    <FormStepContainer>
      <div className='h-80'>
        <p className={`formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 mb-12 text-white`}>{props.title}</p>

        <InputField
          name={props.name}
          textareaProps={{
            className: `border-orange formtext2-regular text-orange orange-placeholder bg-transparent w-full`,
            placeholder: props?.placeholder,
            rows: 4,
          }}
          textarea
          form={form}
        />
        <p className='microcopy text-white md:mt-8 mt-4'>{props?.examples?.title}</p>
        {props?.examples?.options &&
          props?.examples?.options.map((option: string, index: number) => {
            return (
              <p key={option + index} className='microcopy text-white ml-4'>
                {option}
              </p>
            )
          })}
      </div>
    </FormStepContainer>
  )
}

export default FormStepInputContent
