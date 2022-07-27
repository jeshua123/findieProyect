import { useState, useEffect } from 'react'
import { Box, Button, IconButton } from '@material-ui/core'
import { UseFormReturn } from 'react-hook-form'

import InputField from '../../assets/UIkit/Forms/InputField'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

type TUploadFile = {
  form: UseFormReturn<any>
  label: string
  fileUrl: string
  fileName: string
  accept: string
  required?: string
  className?: string
  isDisabled?: boolean
  asPostulation?: boolean
  freelancerFiles: any
  setFreelancerFiles: React.Dispatch<
    React.SetStateAction<{
      fileToDownloadName: string
      fileToDownload: string
    }>
  >
}

const FormUploadButton: React.FC<TUploadFile> = (props) => {
  const [selectedFile, setSelectedFile] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFile = (id: string) => {
    const element = document.getElementById(id)
    element && element.click()
  }

  const removeFile = () => {
    props.form.setValue(props.fileName, '')
    setSelectedFile('')
    props.setFreelancerFiles({ fileToDownloadName: '', fileToDownload: '' })
  }

  useEffect(() => {
    let fileToUpload = props.form.watch(props.fileUrl)
    setErrorMessage('')
    setSelectedFile('')
    if (fileToUpload && fileToUpload?.item(0)?.size > 20000000) {
      props.form.setValue(props.fileUrl, '')
      setErrorMessage('El documento no puede ser mayor de 20MB')
    }
    if (fileToUpload) {
      setSelectedFile(fileToUpload?.item(0)?.name)
      props.form.setValue(`${props.fileName}`, fileToUpload?.item(0)?.name)
    }
  }, [props.form.watch(props.fileUrl)])

  useEffect(() => {
    setSelectedFile('')
  }, [props.freelancerFiles.fileToDownload, props.freelancerFiles.fileToDownloadName])

  return (
    <Box className={`${props.className}`} display='flex flex-col' alignItems='center'>
      <Box mr={1}>
        <span className='body1-medium block'>
          {props.label} <span className={`${props.required ? 'inline' : 'hidden'} body2-bold text-red`}>(*)</span>
        </span>
        {!selectedFile && !props.freelancerFiles.fileToDownload && (
          <Button
            variant='contained'
            color='primary'
            type='button'
            startIcon={<CloudUploadIcon />}
            onClick={() => handleFile(props.fileUrl)}
            disabled={props.isDisabled}
          >
            Cargar
          </Button>
        )}
      </Box>
      <Box mt={0.5}>
        <InputField
          id={props.fileUrl}
          name={props.fileUrl}
          inputProps={{ className: 'hidden', type: 'file', accept: props.accept }}
          options={{ required: props.required }}
          form={props.form}
        />
        {selectedFile && (
          <span className='body2-regular flex items-center'>
            {selectedFile}
            <IconButton size='small' edge='end' disabled={props.isDisabled} onClick={removeFile}>
              <DeleteIcon className='text-red ml-2 cursor-pointer' />
            </IconButton>
          </span>
        )}
        {props.freelancerFiles.fileToDownload && (
          <span className='body2-regular'>
            {props.freelancerFiles.fileToDownloadName}{' '}
            <a href={props.freelancerFiles.fileToDownload} target='_blank'>
              <IconButton size='small' edge='end'>
                <CloudDownloadIcon className='text-black' />
              </IconButton>
            </a>
            {!props.asPostulation && (
              <IconButton size='small' edge='end' disabled={props.isDisabled} onClick={removeFile}>
                <DeleteIcon className='text-red cursor-pointer' />
              </IconButton>
            )}
          </span>
        )}
        <span className='body2-regular block text-red'>{errorMessage}</span>
      </Box>
    </Box>
  )
}

export default FormUploadButton
