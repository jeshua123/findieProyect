import { useState, useEffect, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ICategory } from '../../../models/ICategory'
import { ISkill } from '../../../models/ISkill'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import { useQueryClient } from 'react-query'
import { apiClient } from '../../../utils/ApiClient'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import endpoints from '../../../constants/endpoints'
import { CategoriesContext } from '../../../context/Cpanel/CategoriesContext'
import { useDeleteSkillMutation, usePostSkillMutation, usePutSkillMutation } from '../../../customHooks/request/skillsQuery'
import { LoaderContext } from '../../../context/LoaderContext'

import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import AppDialog from '../../../assets/UIkit/AppDialog'
import SelectField from '../../../assets/UIkit/Forms/SelectField'
import InputField from '../../../assets/UIkit/Forms/InputField'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'

const Skills: React.FC = () => {
  const { categoriesQuery } = useContext(CategoriesContext)
  const loader = useContext(LoaderContext)
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const createForm = useForm()
  const editForm = useForm()
  const skillsQuery = useQueryClient()
  const postSkillMutation = usePostSkillMutation()
  const putSkillMutation = usePutSkillMutation()
  const deleteSkillMutation = useDeleteSkillMutation()
  useRequestAlert(postSkillMutation)
  useRequestAlert(putSkillMutation, editForm, toogleDialog)
  useRequestAlert(deleteSkillMutation, undefined, toogleDialog)
  const [skillsList, setSkillsList] = useState<ISkill[]>([])

  const openDialog = (category: ISkill, action: 'post' | 'edit' | 'delete') => {
    setRecuestAction(action)
    toogleDialog(category)
  }

  const getSkills = async () => {
    if (createForm.watch('categories')) {
      loader.setIsOpen(true)
      const categoryFilter = JSON.stringify({ category: createForm.watch('categories') })
      const resp = await skillsQuery.fetchQuery(`all_${endpoints.skills}`, () => apiClient.getSkillsByCategory(categoryFilter))
      loader.setIsOpen(false)
      setSkillsList(resp.data)
    } else {
      setSkillsList([])
    }
  }

  const createSkill: SubmitHandler<ISkill> = async (data) => {
    const dataEdited = {
      ...data,
      createdAt: new Date().getTime(),
      category: createForm.getValues('categories'),
    }
    postSkillMutation.mutate(dataEdited)
  }

  const editeOrDelete: SubmitHandler<ISkill> = (data) => {
    recuestAction === 'edit' && editSkill(data)
    recuestAction === 'delete' && deleteSkill()
  }

  const editSkill = (data: ISkill) => {
    putSkillMutation.mutate({ body: data, _id: dialog.data._id })
  }

  const deleteSkill = () => {
    deleteSkillMutation.mutate(dialog.data._id)
  }

  useEffect(() => {
    getSkills()
  }, [createForm.watch('categories')])

  useEffect(() => {
    if (postSkillMutation.isSuccess || putSkillMutation.isSuccess || deleteSkillMutation.isSuccess) {
      createForm.setValue('name', '')
      getSkills()
    }
  }, [postSkillMutation.isSuccess, putSkillMutation.isSuccess, deleteSkillMutation.isSuccess])

  useEffect(() => {
    if (dialog.data?.name) {
      editForm.setValue('name', dialog.data.name)
    }
  }, [dialog.data])

  return (
    <>
      <h3 className='mt-6'>Agrega un habilidad</h3>
      <form onSubmit={createForm.handleSubmit(createSkill)}>
        <Grid container className='mt-6' spacing={2}>
          <Grid item xs={4}>
            {categoriesQuery.isSuccess && (
              <SelectField
                name='categories'
                label='Selecciona una categoría'
                inputProps={{ className: 'w-full', placeholder: 'Nombre de la categoría' }}
                options={{ required: 'Este campo es requerido' }}
                form={createForm}
                selectOptions={categoriesQuery.data.map((category: ICategory) => {
                  return { value: category._id, label: category.name }
                })}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            <InputField
              name='name'
              label='Nombre de la habilidad'
              inputProps={{ className: 'w-full' }}
              options={{ required: 'Este campo es requerido' }}
              form={createForm}
            />
          </Grid>
          <Grid item xs={4} className='flex items-end'>
            <Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider className='my-4' />

      {skillsList.length > 0 && (
        <>
          <h3 className='mb-2'>Lista de habilidades segun categoría</h3>

          <List className='border-t border-r border-l border-gray-300 py-0 mt-4'>
            {skillsList.map((skill: ISkill) => {
              return (
                <ListItem key={skill._id} className='border-b border-gray-300'>
                  <span className='subtitle3-regular'>{skill.name}</span>
                  <ListItemSecondaryAction>
                    <IconButton edge='end' onClick={() => openDialog(skill, 'edit')}>
                      <FiIcons name='edit' />
                    </IconButton>
                    <IconButton edge='end' onClick={() => openDialog(skill, 'delete')}>
                      <FiIcons name='skull' />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </>
      )}

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'edit' ? 'Editar' : 'Eliminar'} categoría`}
        handleClose={toogleDialog}
      >
        <form onSubmit={editForm.handleSubmit(editeOrDelete)}>
          {recuestAction === 'edit' ? (
            <>
              <span className='subtitle4-medium mb-4 block'>El nombre del skill a editar es: {dialog?.data?.name}</span>
              <InputField
                name='name'
                label='Nombre del skill'
                inputProps={{ className: 'w-full' }}
                options={{ required: 'Este campo es requerido' }}
                form={editForm}
              />
            </>
          ) : (
            <>
              <span className='subtitle4-medium mb-4 block'>¿Estás seguro de eliminar el skill {dialog?.data?.name}?</span>
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

export default Skills
