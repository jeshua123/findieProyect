import { TGenericInput } from './GenericInput'

export type TGenericSelect = {
  selectOptions?: { value: any; label: string | number | undefined }[]
  withoutDefaultValue?: boolean
  label?: string | any
  inputProps?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
}

const GenericSelect: React.FC<TGenericSelect & TGenericInput> = (props) => {
  const disabledStyle = props?.inputProps?.disabled ? 'bg-black-005 border-none' : 'border border-black'

  return (
    <select
      {...props.form.register(props.name, props.options)}
      className={`md:h-10 h-8 body2-regular px-4 no-focus custom-select ${props.inputProps?.className ?? ''} ${disabledStyle}`}
      disabled={props?.inputProps?.disabled}
    >
      {!props.withoutDefaultValue && <option value=''>Selecciona una opción</option>}
      {props.selectOptions?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default GenericSelect
