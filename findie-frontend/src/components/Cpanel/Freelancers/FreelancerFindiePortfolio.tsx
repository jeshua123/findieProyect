import { FC, useMemo, useState } from 'react'
import FileDropzone, { TFile } from '../../../shared/FileDropZone/FileDropZone'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import { useForm } from 'react-hook-form'
import InputField from '../../../assets/UIkit/Forms/InputField'
import {
  usePortfolioDragAndDropMutation,
  usePutPortfolioFilesMutation,
  usePutRemovePortfolioFiles,
} from '../../../customHooks/request/freelancersQuery'
import { IFreelancer, IPorfolioFileDetail, IPortfolioLinkBody, IPortfolioRemoveFileBody } from '../../../models/IFreelancer'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { UseQueryResult } from 'react-query'
import { parseVideoUrl } from '../../../utils/helpers'
import { saveAs } from 'file-saver'

import { Box, Button, Divider, IconButton } from '@material-ui/core'
import AppDialog from '../../../assets/UIkit/AppDialog'
import PhotoIcon from '@material-ui/icons/Photo'
import LinkIcon from '@material-ui/icons/Link'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import GetAppIcon from '@material-ui/icons/GetApp'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type TFreelancerFindiePortfolio = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  afterFreelancerMutation: () => void
}

type TColumnFile = {
  column: string
  files: IPorfolioFileDetail[]
}

const FreelancerFindiePortfolio: FC<TFreelancerFindiePortfolio> = (props) => {
  const form = useForm()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const putPortfolioImageMutation = usePutPortfolioFilesMutation()
  const removePortfolioMutation = usePutRemovePortfolioFiles()
  const portfolioDragAndDropMutation = usePortfolioDragAndDropMutation()
  useRequestAlert(putPortfolioImageMutation, undefined, props.afterFreelancerMutation)
  useRequestAlert(removePortfolioMutation, undefined, props.afterFreelancerMutation)
  useRequestAlert(portfolioDragAndDropMutation, undefined, undefined, afterDndErrorMutate)
  const [portfolioColumns, setPortfolioColumns] = useState<TColumnFile[]>([])
  const [beforedragAndDrop, setBeforedragAndDrop] = useState<TColumnFile[]>([])

  const findColumn = (column: 'a' | 'b' | 'c') => {
    if (!props.freelancer.isSuccess) return []
    const files = props.freelancer.data.portfolio_files.find((portfolio) => portfolio.column === column)
    return files ? files.files : []
  }

  useMemo(() => {
    if (!props.freelancer.isSuccess) return setPortfolioColumns([])

    const portfolio = ['a', 'b', 'c'].map((column: string) => {
      return { column, files: findColumn(column as 'a' | 'b' | 'c') }
    })
    setPortfolioColumns(portfolio)
  }, [props.freelancer.isFetching])

  const onDragEnd = (result: any) => {
    const { source, destination } = result
    if (!destination) return
    if (source.index === destination.index && source.droppableId === destination.droppableId) return

    if (source.droppableId === destination.droppableId) return singleColumnDnD(source, destination)
    multipleColumnDnD(source, destination)
  }

  const singleColumnDnD = (source: any, destination: any) => {
    const findFiles = portfolioColumns.find((portfolio: TColumnFile) => portfolio.column === source.droppableId)
    const filesToChange = findFiles?.files ?? []

    const list = [...filesToChange]
    const [removed] = list.splice(source.index, 1)
    list.splice(destination.index, 0, removed)

    const listEdited = list.map((file: IPorfolioFileDetail, index: number) => {
      return { ...file, position: index + 1 }
    })

    const portfolio_files = portfolioColumns.map((portfolio: TColumnFile) => {
      if (portfolio.column === source.droppableId) {
        return { ...portfolio, files: listEdited }
      }
      return portfolio
    })

    setBeforedragAndDrop(portfolioColumns)
    setPortfolioColumns(portfolio_files)
    portfolioDragAndDropMutation.mutate({ body: portfolio_files, _id: props.freelancerId })
  }

  const multipleColumnDnD = (source: any, destination: any) => {
    let fileToMove: unknown = {}
    const findSourceFiles = portfolioColumns.find((portfolio: TColumnFile) => portfolio.column === source.droppableId)
    const sourceFiles = findSourceFiles?.files ?? []
    const findDestinationFiles = portfolioColumns.find((portfolio: TColumnFile) => portfolio.column === destination.droppableId)
    const destinationFiles = findDestinationFiles?.files ?? []

    const sourceList = [...sourceFiles]
    const sourceFilesEdited = sourceList
      .map((file: IPorfolioFileDetail) => {
        if (file.position < source.index + 1) return file

        if (file.position === source.index + 1) {
          fileToMove = { ...file, position: 1000 }
          return { ...file, position: 0 }
        }

        return { ...file, position: file.position - 1 }
      })
      .filter((file: IPorfolioFileDetail) => file.position !== 0)

    destinationFiles.splice(destination.index, 0, fileToMove as IPorfolioFileDetail)
    const destinationFilesEdited = destinationFiles.map((file: IPorfolioFileDetail) => {
      if (file.position < destination.index + 1) return file

      if (file.position === 1000) {
        return { ...file, position: destination.index + 1 }
      }

      return { ...file, position: file.position + 1 }
    })

    const portfolio_files = portfolioColumns.map((portfolio: TColumnFile) => {
      if (portfolio.column === source.droppableId) {
        return { ...portfolio, files: sourceFilesEdited }
      }

      if (portfolio.column === destination.droppableId) {
        return { ...portfolio, files: destinationFilesEdited }
      }
      return portfolio
    })

    setBeforedragAndDrop(portfolioColumns)
    setPortfolioColumns(portfolio_files)
    portfolioDragAndDropMutation.mutate({ body: portfolio_files, _id: props.freelancerId })
  }

  function afterDndErrorMutate() {
    setPortfolioColumns(beforedragAndDrop)
  }

  const openDialog = (action: 'images' | 'link' | 'delete', column: 'a' | 'b' | 'c' | IPortfolioRemoveFileBody) => {
    setRecuestAction(action)
    toogleDialog(column)
  }

  const savePorfolioImage = async (files: TFile[]) => {
    const body = { column: dialog.data, files }
    putPortfolioImageMutation.mutate(
      { body, _id: props.freelancerId },
      {
        onSuccess: () => closeDialog(),
      }
    )
  }
  const savePorfolioLink = async (data: IPorfolioFileDetail) => {
    if (!data.link) return

    const body: IPortfolioLinkBody = {
      column: dialog.data,
      files: [{ name: 'external_link', link: parseVideoUrl(data.link as string) }],
    }
    putPortfolioImageMutation.mutate(
      { body, _id: props.freelancerId },
      {
        onSuccess: () => closeDialog(),
      }
    )
  }

  const removeFile = () => {
    const body = {
      column: dialog.data.column,
      file: dialog.data.file,
    }
    removePortfolioMutation.mutate(
      { body, _id: props.freelancerId },
      {
        onSuccess: () => closeDialog(),
      }
    )
  }

  const closeDialog = () => {
    toogleDialog('')
    form.reset()
  }

  return (
    <>
      <p className='subtitle4-medium my-4'>Portafolio</p>
      <div className='grid grid-cols-12 gap-2 w-5/6 mx-auto'>
        {['a', 'b', 'c'].map((column: string) => {
          return (
            <div key={column} className='col-span-4 rounded-t-xl bg-blue py-2 px-4'>
              <div className='flex justify-between'>
                <p className='subtitle4-medium  text-white'>Columna {column.toUpperCase()}</p>

                <div>
                  <IconButton className='p-0 mr-2' onClick={() => openDialog('images', column as 'a' | 'b' | 'c')}>
                    <PhotoIcon className='text-white' />
                  </IconButton>
                  <IconButton className='p-0' onClick={() => openDialog('link', column as 'a' | 'b' | 'c')}>
                    <LinkIcon className='text-white' />
                  </IconButton>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-12 w-5/6 mx-auto gap-2'>
          {portfolioColumns.map((portfolio: TColumnFile) => {
            return (
              <Droppable key={portfolio.column} droppableId={portfolio.column} type='TASK'>
                {(provided) => (
                  <div className='col-span-4' ref={provided.innerRef} {...provided.droppableProps}>
                    {portfolio.files
                      .sort((a, b) => a.position - b.position)
                      .map((file: IPorfolioFileDetail, index: number) => {
                        return (
                          <Draggable
                            key={`${portfolio.column}-${file.position}`}
                            draggableId={`${portfolio.column}-${file.position}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={`${file.link ? 'pt-10' : ''} mt-2`}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {file.link && (
                                  <div className='h-10 -mt-10 px-4 pt-2 bg-black text-white rounded-t-md'>
                                    <p className='subtitle4-medium text-center'>Click aqui para arrastrar</p>
                                  </div>
                                )}
                                <div className='relative'>
                                  {file.link ? (
                                    <iframe
                                      className='h-64 w-full'
                                      src={file.link}
                                      frameBorder='0'
                                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                      allowFullScreen
                                    />
                                  ) : (
                                    <img src={file.url} alt={file.name} className='w-full' />
                                  )}
                                  <div className='absolute top-2 right-2 flex items-center bg-black rounded-xl py-0.5 px-2'>
                                    {file.url && (
                                      <IconButton className='p-0' onClick={() => saveAs(file.url as string)}>
                                        <GetAppIcon className='text-white' />
                                      </IconButton>
                                    )}
                                    <IconButton
                                      className='p-0'
                                      onClick={() => openDialog('delete', { column: portfolio.column, file })}
                                    >
                                      <HighlightOffIcon className='text-red' />
                                    </IconButton>
                                  </div>
                                  <div className='absolute top-2 left-2 w-6 h-6 rounded-full bg-black total-center'>
                                    <p className='subtitle4-medium text-white'>{file.position}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          })}
        </div>
      </DragDropContext>

      <AppDialog open={dialog.isOpen} maxWidth='xl' title='Imagenes/links' handleClose={closeDialog}>
        {recuestAction === 'images' && (
          <Box width='50vw'>
            <span className='subtitle4-medium mb-4 block'>
              Sube una o varias imagenes en la columna <span className='uppercase'> "{dialog?.data}"</span>.
            </span>

            {dialog.isOpen && (
              <FileDropzone
                errorTitle='Solo se adminten archivos con la extensión jpg, jpeg, pgn y gif.'
                acceptedFileTypes='.png, .jpg, .jpeg, .gif'
                onSubmit={(files) => savePorfolioImage(files)}
              />
            )}
          </Box>
        )}
        {recuestAction === 'link' && (
          <form onSubmit={form.handleSubmit(savePorfolioLink)}>
            <span className='subtitle4-medium mb-4 block'>
              Sube un video de youtube o link hacia un sitio web en la columna{' '}
              <span className='uppercase'> "{dialog?.data}"</span>.
            </span>

            <InputField
              name='link'
              label='Link'
              inputProps={{ className: 'w-full mb-4' }}
              options={{ required: 'Este campo es requerido' }}
              form={form}
            />

            <Divider className='mt-4' />
            <Box display='flex' justifyContent='flex-end' mt={2}>
              <Button type='reset' variant='contained' className='mr-4' onClick={closeDialog}>
                Cancelar
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Aceptar
              </Button>
            </Box>
          </form>
        )}
        {recuestAction === 'delete' && (
          <>
            <span className='subtitle4-medium mb-4 block'>
              Estas seguro que deseas eliminar el archivo: {dialog?.data?.file?.name} de la columna{' '}
              <span className='uppercase'> "{dialog?.data?.column}"</span>
            </span>

            <Divider className='mt-4' />
            <Box display='flex' justifyContent='flex-end' mt={2}>
              <Button type='reset' variant='contained' className='mr-4' onClick={closeDialog}>
                Cancelar
              </Button>
              <Button variant='contained' color='primary' onClick={removeFile}>
                Aceptar
              </Button>
            </Box>
          </>
        )}
      </AppDialog>
    </>
  )
}

export default FreelancerFindiePortfolio
