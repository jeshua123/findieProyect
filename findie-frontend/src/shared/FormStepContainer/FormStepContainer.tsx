import { PropsWithChildren } from 'react'

const FormStepContainer: React.FC = (props: PropsWithChildren<any>) => {
  return (
    <div className='form-content-height total-center overflow-auto'>
      <div className='lg:w-1/2 md:w-8/12 w-9/12 md:mb-32 mb-0'>{props.children}</div>
    </div>
  )
}

export default FormStepContainer
