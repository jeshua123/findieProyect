import LabeField from './LabeField'
import FormError from './FormError'
import { TGenericInput } from './GenericInput'
import { Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'

const ClpField: React.FC<TGenericInput> = (props) => {
  return (
    <div className={props.className}>
      <LabeField {...props} />
      <Controller
        control={props.form.control}
        name={props.name}
        rules={props.options}
        defaultValue=''
        render={({ field: { onChange, name, value } }) => (
          <NumberFormat
            className={`md:h-10 h-8 no-focus px-4 body2-regular 
          ${props?.inputProps?.disabled ? 'bg-black-005 border-none' : 'border border-black'} ${
              props.inputProps?.className ?? ''
            }`}
            disabled={props.inputProps?.disabled}
            placeholder={props.inputProps?.placeholder}
            thousandSeparator={'.'}
            decimalSeparator={','}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {/* <GenericInput {...rest} name='qwe' inputProps={{ ...props.inputProps }} /> */}
      <FormError name={props.name} errors={props.form?.formState?.errors} />
    </div>
  )
}

export default ClpField
