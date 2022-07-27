import LabeField from './LabeField'
import FormError from './FormError'
import GenericInput, { TGenericInput } from './GenericInput'

const InputField: React.FC<TGenericInput> = (props) => {
  return (
    <div className={props.className}>
      <LabeField {...props} />
      <GenericInput {...props} inputProps={{ ...props.inputProps }} />
      <FormError name={props.name} errors={props.form?.formState?.errors} />
    </div>
  )
}

export default InputField
