// type TLabeField = {
//   label?: string | any
//   name: string
// }

import { TGenericInput } from './GenericInput'

const LabeField: React.FC<TGenericInput> = (props) => {
  return (
    <>
      {props.label && (
        <label className='subtitle4-medium block' htmlFor={props.id}>
          {props.label}
        </label>
      )}
    </>
  )
}

export default LabeField
