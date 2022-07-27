import LabeField from './LabeField'
import FormError from './FormError'
import { TGenericInput } from './GenericInput'
import GenericSelect, { TGenericSelect } from './GenericSelect'

const SelectField: React.FC<TGenericSelect & TGenericInput> = (props) => {
  return (
    <div className={props.className}>
      <LabeField {...props} />
      <GenericSelect {...props} inputProps={{ ...props.inputProps }} />
      <FormError name={props.name} errors={props.form?.formState?.errors} />
    </div>
  )
}

export default SelectField
