import { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { loadFiles } from '../../utils/helpers'

import { Button } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

type TFileDropZone = {
  errorTitle: string
  acceptedFileTypes: string //Format: 'image/jpg,image/jpeg,image/png,image/gif'
  onSubmit: (files: TFile[]) => void
}

export type TFile = { name: string; url: string }

const FileDropzone: FC<TFileDropZone> = (props) => {
  const [files, setFiles] = useState<TFile[]>([])
  const { getRootProps, getInputProps, fileRejections, acceptedFiles, isDragActive, open } = useDropzone({
    accept: props.acceptedFileTypes,
    noClick: true,
    noKeyboard: true,
    multiple: true,
  })

  const addFile = async (acceptedFiles: File[]) => {
    const newFiles = await Promise.all(
      acceptedFiles.map(async (file: File) => {
        const base64File = await loadFiles(file)
        return { name: file.name, url: base64File as string }
      })
    )
    setFiles([...files, ...newFiles])
  }

  const removeFile = (fileToRemove: TFile) => {
    const removedfile = files.filter((file: TFile) => file.url !== fileToRemove.url)
    setFiles(removedfile)
  }

  useEffect(() => {
    !fileRejections.length && acceptedFiles.length && addFile(acceptedFiles)
  }, [acceptedFiles])

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div
        className={`col-span-12 h-96 rounded-xl p-4 relative border-dashed ${
          isDragActive ? 'border-2 border-green-400' : 'border border-gray-400'
        }`}
        {...getRootProps()}
      >
        <div>
          {files.length > 0 && (
            <div className='flex justify-between'>
              <p className='subtitle4-medium'>Archivos seleccionados</p>
              {acceptedFiles.length > 0 && (
                <p className='microcopy text-red cursor-pointer hover:underline' onClick={() => setFiles([])}>
                  Remover todas
                </p>
              )}
            </div>
          )}
          <div className='grid grid-cols-12 mt-4 gap-y-2 h-72 overflow-auto'>
            {files.map((file: TFile) => {
              return (
                <div
                  key={file.url}
                  className='xl:col-span-3 col-span-4 mx-1 h-32 w-36 border border-gray-300 rounded-xl p-2 mx-auto'
                >
                  <div className='flex justify-between border-b border-gray-300'>
                    <p className='body2-regular'>{file.name.slice(0, 10)}</p>
                    <DeleteOutlineIcon fontSize='small' className='text-red ml-1' onClick={() => removeFile(file)} />
                  </div>
                  <img src={file.url} className='w-36 h-20 mx-auto mt-2 object-fill' />
                </div>
              )
            })}
          </div>
        </div>

        <div className='absolute bottom-0 left-2'>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className='body2-regular text-gray-400'>Suelta el archivo ...</p>
          ) : (
            <div>
              <p className='body2-regular text-gray-400'>
                Arrastra archivos o{' '}
                <span className='underline text-blue' onClick={open}>
                  click para seleccionarlos.
                </span>
              </p>
              {fileRejections.length > 0 && <p className='body2-regular text-red'>{props.errorTitle}</p>}
            </div>
          )}
        </div>
      </div>
      <Button
        className='col-span-12 ml-auto'
        variant='contained'
        color='primary'
        type='button'
        startIcon={<CloudUploadIcon />}
        onClick={() => props.onSubmit(files)}
        disabled={!files.length}
      >
        Subir archivos
      </Button>
    </div>
  )
}

export default FileDropzone
