import { useState, useContext, useEffect } from 'react'
import { CategoriesContext } from '../../../context/Cpanel/CategoriesContext'
import { useForm } from 'react-hook-form'
import { IFreelancer } from '../../../models/IFreelancer'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import { ICategory } from '../../../models/ICategory'
import {
  useDragAndDropFreelancerMutation,
  useFreelancersQuery,
  useHandleFeatureFreelancerMutation,
} from '../../../customHooks/request/freelancersQuery'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import moment from 'moment'

import { Box, Button, Divider, IconButton } from '@material-ui/core'
import SelectField from '../../../assets/UIkit/Forms/SelectField'
import AppDialog from '../../../assets/UIkit/AppDialog'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'

const FreelancersFindieFeatured: React.FC = () => {
  const { categoriesQuery } = useContext(CategoriesContext)
  const form = useForm()
  const { dialog, toogleDialog } = useOpenDialog()
  const handleFeatureFreelancerMutation = useHandleFeatureFreelancerMutation()
  const dragAndDropFreelancerMutation = useDragAndDropFreelancerMutation()
  const freelancersQuery = useFreelancersQuery({
    'featured_status.is_featured': true,
    category: form.watch('categories') || (categoriesQuery.isSuccess && (categoriesQuery?.data[0]?._id ?? '')) || undefined,
  })
  useRequestAlert(handleFeatureFreelancerMutation, undefined, afterDeleteMutate)
  useRequestAlert(dragAndDropFreelancerMutation, undefined, undefined, afterDndErrorMutate)
  useSetLoader(freelancersQuery)
  const [beforeDragAndDrop, setBeforeDragAndDrop] = useState<IFreelancer[]>([])
  const [freelancerList, setFreelancerList] = useState<IFreelancer[]>([])

  const onDragEnd = (result: any) => {
    const { source, destination } = result
    if (!destination) return
    if (source.index === destination.index && source.droppableId === destination.droppableId) return

    const list = [...freelancerList]
    const [removed] = list.splice(source.index, 1)
    list.splice(destination.index, 0, removed)
    const listEdited = list.map((freelancer: IFreelancer, index: number) => {
      return { ...freelancer, featured_status: { ...freelancer.featured_status, position: index + 1 } }
    })
    setBeforeDragAndDrop(freelancerList)
    setFreelancerList(listEdited)
    dragAndDropFreelancerMutation.mutate({ body: listEdited })
  }

  const removeFreelancer = () => {
    handleFeatureFreelancerMutation.mutate({
      body: {
        featured_status: {
          is_featured: false,
          has_feartued_icon: false,
          position: dialog.data.featured_status.position,
          position_date: new Date().getTime(),
        },
      },
      _id: dialog.data._id,
      category: dialog.data.category._id,
    })
  }

  function afterDeleteMutate() {
    toogleDialog()
    const removeFreelancer = freelancerList.filter((freelancer: IFreelancer) => freelancer._id !== dialog?.data?._id)
    const listEdited = removeFreelancer.map((freelancer: IFreelancer, index: number) => {
      return { ...freelancer, featured_status: { ...freelancer.featured_status, position: index + 1 } }
    })
    setFreelancerList(listEdited)
  }

  function afterDndErrorMutate() {
    setFreelancerList(beforeDragAndDrop)
  }

  useEffect(() => {
    if (categoriesQuery.isSuccess) {
      form.setValue('categories', categoriesQuery.data[0]?._id)
    }
  }, [categoriesQuery.isSuccess])

  useEffect(() => {
    if (freelancersQuery.isSuccess) {
      const freelancerListEdited: IFreelancer[] = freelancersQuery.data.data.sort(
        (a: IFreelancer, b: IFreelancer) => a.featured_status.position - b.featured_status.position
      )
      setFreelancerList(freelancerListEdited)
    }
  }, [freelancersQuery.isSuccess])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {categoriesQuery.isSuccess && (
        <Box className='flex justify-between' width='90%'>
          <SelectField
            name='categories'
            label='Selecciona una categoría'
            inputProps={{ className: 'w-96', placeholder: 'Nombre de la categoría' }}
            options={{ required: 'Este campo es requerido' }}
            form={form}
            selectOptions={categoriesQuery.data.map((category: ICategory) => {
              return { value: category._id, label: category.name }
            })}
          />
          <p className='body2-regular self-end'>Hoy es: {moment(new Date()).format('DD/MM/YYYY')}</p>
        </Box>
      )}

      <Box display='grid' gridTemplateColumns='60px 1fr 250px 150px 50px' width='90%' className='bg-black-005 px-2 py-1 mt-4'>
        <p className='subtitle4-regular'>#</p>
        <p className='subtitle4-regular'>Nombre</p>
        <p className='subtitle4-regular'>Especialidad</p>
        <p className='subtitle4-regular'>Fecha</p>
        <p></p>
      </Box>

      <Droppable droppableId='featured_freelancers'>
        {(droppableProvided: any) => (
          <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
            {freelancerList.map((freelancer: IFreelancer, index: number) => {
              return (
                <Draggable key={freelancer._id} draggableId={freelancer._id} index={index}>
                  {(draggableProvided: any) => (
                    <Box
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      display='grid'
                      gridTemplateColumns='60px 1fr 250px 150px 50px'
                      width='90%'
                      className='px-2 py-1 mt-2 hover:bg-ice-blue hover:border-b-black'
                    >
                      <p className='subtitle4-regular mt-4'>{freelancer.featured_status.position}.</p>
                      <Box className='flex items-center'>
                        <img src={freelancer.avatar.url} alt='avatar' className='w-10 w-16 mr-4' />
                        <p className='subtitle4-medium'>
                          {freelancer.name} {freelancer.lastName}
                        </p>
                      </Box>

                      <p className='subtitle4-medium self-center'>{freelancer.college_degree}</p>
                      <p className='subtitle4-medium self-center'>
                        {moment(freelancer.featured_status.position_date).format('YYYY-MM-DD')}
                      </p>
                      <Box className='total-center'>
                        <IconButton onClick={() => toogleDialog(freelancer)}>
                          <FiIcons name='skull' />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Draggable>
              )
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>

      <AppDialog open={dialog.isOpen} title='Suspender Freelancer' handleClose={toogleDialog}>
        <span className='subtitle4-medium'>¿Estás seguro que deseas sacar a {dialog?.data?.name} de la lista de destacados.</span>
        <Divider className='my-3' />

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-2' onClick={toogleDialog}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary' onClick={removeFreelancer}>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </DragDropContext>
  )
}

export default FreelancersFindieFeatured
