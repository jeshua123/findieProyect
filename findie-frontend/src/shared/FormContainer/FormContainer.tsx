import { PropsWithChildren } from 'react'

type TFormContainer = {
  background?: any
  className?: string
}

const FormContainer: React.FC<TFormContainer> = (props: PropsWithChildren<any>) => {
  return (
    <div
      className={`p-3 h-screen w-screen ${props.className}`}
      style={{ backgroundImage: `url(${props.background})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}
    >
      <div className='total-center relative w-full h-full bg-white'>{props.children}</div>
    </div>
  )
}

export default FormContainer
