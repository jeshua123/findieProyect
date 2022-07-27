import { useContext, useState, useEffect } from 'react'
import {
  usePostCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} from '../../../customHooks/request/categoriesQuery'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ICategory } from '../../../models/ICategory'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { CategoriesContext } from '../../../context/Cpanel/CategoriesContext'

import AppDialog from '../../../assets/UIkit/AppDialog'
import InputField from '../../../assets/UIkit/Forms/InputField'

import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'

const Categories: React.FC = () => {
  const { categoriesQuery } = useContext(CategoriesContext)
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const createForm = useForm<ICategory>()
  const editForm = useForm<ICategory>()
  const postCategoryMutation = usePostCategoryMutation()
  const putCategoryMutation = usePutCategoryMutation()
  const deleteCategoryMutation = useDeleteCategoryMutation()
  useRequestAlert(postCategoryMutation, createForm)
  useRequestAlert(putCategoryMutation, editForm, toogleDialog)
  useRequestAlert(deleteCategoryMutation, undefined, toogleDialog)

  const openDialog = (category: ICategory, action: 'post' | 'edit' | 'delete' | 'suspend') => {
    setRecuestAction(action)
    toogleDialog(category)
  }

  const createCategory: SubmitHandler<ICategory> = async (data) => {
    const dataEdited = {
      ...data,
      createdAt: new Date().getTime(),
    }
    postCategoryMutation.mutate(dataEdited)
  }

  const handleCategory: SubmitHandler<ICategory> = (data) => {
    recuestAction === 'edit' && editCategory(data)
    recuestAction === 'delete' && deleteCategory()
    recuestAction === 'suspend' && editCategory({ ...data, is_available: !dialog.data.is_available })
  }

  const editCategory = (data: ICategory) => {
    putCategoryMutation.mutate({ body: data, _id: dialog.data._id })
  }

  const deleteCategory = () => {
    deleteCategoryMutation.mutate(dialog.data._id)
  }

  useEffect(() => {
    if (dialog.data?.name) {
      editForm.setValue('name', dialog.data.name)
      editForm.setValue('is_link_required', dialog.data.is_link_required)
      editForm.setValue('portfolio.isRequired', dialog.data.portfolio.isRequired)
      editForm.setValue('portfolio.should_render', dialog.data.portfolio.should_render)
      editForm.setValue('is_other_category', dialog.data.is_other_category)
    }
  }, [dialog.data])

  useEffect(() => {
    createForm.watch('portfolio.isRequired') && createForm.setValue('portfolio.should_render', true)
    editForm.watch('portfolio.isRequired') && editForm.setValue('portfolio.should_render', true)
  }, [createForm.watch('portfolio.isRequired'), editForm.watch('portfolio.isRequired')])

  return (
    <>
      <h3 className='mt-6'>Agrega una categoría</h3>
      <form onSubmit={createForm.handleSubmit(createCategory)}>
        <Grid container spacing={2}>
          <Grid item xs={4} className='mt-4'>
            <InputField
              name='name'
              label='Nombre'
              inputProps={{ className: 'w-full', placeholder: 'Nombre de la categoría' }}
              options={{ required: 'Este campo es requerido' }}
              form={createForm}
            />
          </Grid>
          <Grid item xs={12} className='self-end py-0'>
            <Box className='flex items-center mt-1'>
              <InputField
                name='portfolio.should_render'
                inputProps={{ className: 'no-height', type: 'checkbox' }}
                form={createForm}
              />
              <span className='body2-medium ml-2'>¿Debo solicitar portafolio?</span>
              <span className='body2-medium mx-6'>/</span>

              <InputField
                name='portfolio.isRequired'
                inputProps={{ className: 'no-height', type: 'checkbox' }}
                form={createForm}
              />
              <span className='body2-medium ml-2'>¿Es el portafolio requerido?</span>
              <span className='body2-medium mx-6'>/</span>

              <InputField name='is_link_required' inputProps={{ className: 'no-height', type: 'checkbox' }} form={createForm} />
              <span className='body2-medium ml-2'>¿Es el link requerido?</span>
              <span className='body2-medium mx-6'>/</span>

              <InputField name='is_other_category' inputProps={{ className: 'no-height', type: 'checkbox' }} form={createForm} />
              <span className='body2-medium ml-2'>¿La categoría es de tipo "Otro"?</span>
            </Box>
          </Grid>
          <Grid item xs={12} className='flex justify-end lg:pt-0 pt-2 mt-4'>
            <Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider className='my-4' />

      <h3 className='mb-2'>Lista de categorías</h3>
      <List className='border-t border-r border-l border-gray-300 py-0'>
        {categoriesQuery.isSuccess &&
          categoriesQuery.data.map((category: ICategory) => {
            return (
              <ListItem key={category._id} className='border-b border-gray-300'>
                <span className='body2-regular'>{category.name}</span>

                <ListItemSecondaryAction>
                  <IconButton edge='end' onClick={() => openDialog(category, 'edit')}>
                    <FiIcons name='edit' />
                  </IconButton>
                  <IconButton edge='end' onClick={() => openDialog(category, 'suspend')}>
                    <FiIcons name='eye' className={`${category.is_available ? '' : 'svg-white'}`} />
                  </IconButton>
                  <IconButton onClick={() => openDialog(category, 'delete')}>
                    <FiIcons name='skull' />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
      </List>

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'edit' ? 'Editar' : 'Eliminar'} categoría`}
        handleClose={toogleDialog}
      >
        <form onSubmit={editForm.handleSubmit(handleCategory)}>
          {recuestAction === 'edit' && (
            <>
              <span className='subtitle4-medium mb-4 block'>El nombre de la categoría a editar es: {dialog?.data?.name}</span>
              <InputField
                name='name'
                label='Nombre'
                inputProps={{ className: 'w-full', placeholder: 'Nombre de la categoría' }}
                options={{ required: 'Este campo es requerido' }}
                form={editForm}
              />
              <Box className='flex items-center mt-1'>
                <InputField
                  name='portfolio.should_render'
                  inputProps={{ className: 'no-height', type: 'checkbox' }}
                  form={editForm}
                />
                <span className='subtitle4-medium ml-2'>¿Debo solicitar portafolio?</span>
              </Box>
              <Box className='flex items-center mt-1'>
                <InputField
                  name='portfolio.isRequired'
                  inputProps={{ className: 'no-height', type: 'checkbox' }}
                  form={editForm}
                />
                <span className='subtitle4-medium ml-2'>¿Es el portafolio requerido?</span>
              </Box>
              <Box className='flex items-center mt-1'>
                <InputField name='is_link_required' inputProps={{ className: 'no-height', type: 'checkbox' }} form={editForm} />
                <span className='subtitle4-medium ml-2'>¿Es el link requerido?</span>
              </Box>
              <Box className='flex items-center mt-1'>
                <InputField
                  name='is_other_category'
                  inputProps={{ className: 'no-height', type: 'checkbox', id: 'is_other_category_edit' }}
                  form={editForm}
                />
                <label htmlFor='is_other_category_edit' className='subtitle4-medium ml-1 cursor-pointer'>
                  ¿La categoría es de tipo "Otro"?
                </label>
              </Box>
            </>
          )}
          {recuestAction === 'suspend' && (
            <>
              <span className='subtitle4-medium mb-4 block'>
                ¿Estás seguro de suspender la categoría {dialog?.data?.name}? <br />
              </span>
            </>
          )}
          {recuestAction === 'delete' && (
            <>
              <span className='subtitle4-medium mb-4 block'>
                ¿Estás seguro de eliminar la categoría {dialog?.data?.name}? <br />
              </span>
              <span className='subtitle4-medium mb-4 block'>
                No podrás revertir este proceso y todos los freelancer que tengan esta categoría perderán este dato y será
                necesario reemplazarlo manualmente en cada uno de ellos.
              </span>
            </>
          )}
          <Divider className='mt-4' />

          <Box display='flex' justifyContent='flex-end' mt={2}>
            <Button variant='contained' className='mr-4' onClick={toogleDialog}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Aceptar
            </Button>
          </Box>
        </form>
      </AppDialog>
    </>
  )
}

export default Categories
