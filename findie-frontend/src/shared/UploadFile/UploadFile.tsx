import { ReactElement } from 'react'
import { UseFormReturn } from 'react-hook-form'
import InputField from '../../assets/UIkit/Forms/InputField'

type TUploadFile = {
  form: UseFormReturn<any>
  className?: string
  name: string
  accept: string
  fileSelected: string
  uploadElement: ReactElement
  removeElement: ReactElement
  onRemove: () => void
}

const UploadFile: React.FC<TUploadFile> = (props) => {
  const handleFile = (id: string) => {
    if (props.fileSelected) return props.onRemove()

    const element = document.getElementById(id)
    element && element.click()
  }

  return (
    <span className={props.className ?? ''} onClick={() => handleFile(props.name)}>
      {props.fileSelected ? props.removeElement : props.uploadElement}
      <InputField
        id={props.name}
        name={props.name}
        inputProps={{
          className: 'hidden',
          type: 'file',
          accept: '.pdf',
        }}
        form={props.form}
      />
    </span>
  )
}

export default UploadFile
