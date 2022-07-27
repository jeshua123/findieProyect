import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export type TGenericInput = {
  name: string
  label?: string
  id?: string
  textarea?: boolean
  form: UseFormReturn<any>
  options?: RegisterOptions
  className?: string
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  textareaProps?: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
}

const GenericInput: React.FC<TGenericInput> = (props) => {
  return (
    <>
      {props.textarea ? (
        <textarea
          {...props.textareaProps}
          {...props.form.register(props.name, props.options)}
          className={`no-focus px-4 body2-regular py-2 
          ${props?.textareaProps?.disabled ? 'bg-black-005 border-none' : 'border border-black'} 
          ${props.textareaProps?.className ?? ''}`}
          id={props.id}
        />
      ) : (
        <input
          {...props.inputProps}
          {...props.form.register(props.name, props.options)}
          className={`md:h-10 h-8 no-focus px-4 body2-regular 
          ${props?.inputProps?.disabled ? 'bg-black-005 border-none' : 'border border-black'} ${
            props.inputProps?.className ?? ''
          }`}
          id={props.id}
        />
      )}
    </>
  )
}

export default GenericInput
