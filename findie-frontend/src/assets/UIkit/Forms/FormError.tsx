type TFormError = {
  name: string
  errors: any
}

const FormError: React.FC<TFormError> = (props) => {
  const errors = props?.errors[props.name]

  return <p className='body2-regular text-red'>{errors?.message}</p>
}

export default FormError
