import { Dispatch } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ICategory } from '../../models/ICategory'
import { ISkill } from '../../models/ISkill'
import { UseQueryResult } from 'react-query'
import { IStack, IProject } from '../../models/IProject'
import useCategories from '../../customHooks/useCategoriests'
import useProjectStack from '../../customHooks/useProjectStack'
import { uniqueKey } from '../../utils/helpers'
import { useSnackbar } from 'notistack'

import { Box, Chip, Grid, IconButton, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import SelectField from '../../assets/UIkit/Forms/SelectField'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { FiIcons } from '../../assets/UIkit/Icons/FiIcons'
import { TInputProps } from './Project'
import FiButton from '../../assets/UIkit/FiButton'

type TProjectStack = {
  isDisabledFields?: boolean
  project?: UseQueryResult<IProject, unknown>
  form: UseFormReturn<any>
  stackList: Partial<IStack>[]
  setStackList: Dispatch<React.SetStateAction<Partial<IStack>[]>>
  setInputDefaultProps: (param: TInputProps) => any
}

const ProjectStack: React.FC<TProjectStack> = (props) => {
  const setInputDefaultProps = props.setInputDefaultProps
  const snackbar = useSnackbar()
  const categoriesQuery = useCategories()
  const { skillsList, selectedStack, defaultStack, removeSkill, setSelectedStack } = useProjectStack(props.form)
  const isProjectSuccessOrCancelled = ['cancelled', 'finished', undefined].includes(props.project?.data?.project_status)

  const setNewStack = () => {
    if (!selectedStack.skills.length || !selectedStack.category?._id) return

    const newCategory = { stack_id: uniqueKey(), category: selectedStack.category, skills: selectedStack.skills }
    props.setStackList([...props.stackList, newCategory])
    props.form.setValue('category_selected', '')
    setSelectedStack(defaultStack)
    snackbar.enqueueSnackbar('Stack creado exitosamente!', { variant: 'success' })
  }

  const setStackToEdit = (stack: Partial<IStack>) => {
    props.form.setValue('category_selected', JSON.stringify(stack.category))
    setSelectedStack({ stack_id: stack.stack_id, category: stack.category, skills: stack.skills })
  }

  const editStack = () => {
    const stackListEdited = props.stackList.map((stack: Partial<IStack>) => {
      if (stack.stack_id === selectedStack.stack_id)
        return { ...stack, category: selectedStack.category, skills: selectedStack.skills }
      return stack
    })
    props.setStackList(stackListEdited)
    resetSelectedStack()
    snackbar.enqueueSnackbar('Stack editado exitosamente!', { variant: 'success' })
  }

  const resetSelectedStack = () => {
    setSelectedStack(defaultStack)
    props.form.setValue('category_selected', '')
  }

  const removeCategory = (stack: Partial<IStack>) => {
    const categoryRemoved = props.stackList.filter((item: Partial<IStack>) => item?.category?._id !== stack?.category?._id)
    props.setStackList(categoryRemoved)
  }

  return (
    <>
      {!isProjectSuccessOrCancelled && (
        <>
          <p className='subtitle4-medium mt-4'>4. Selecciona un stack de trabajo</p>
          <Grid container spacing={2} className='mt-2 ml-px'>
            <Grid item xs={9}>
              <div className='grid grid-cols-12 gap-4'>
                {categoriesQuery.isSuccess && (
                  <SelectField
                    {...setInputDefaultProps({ name: 'category_selected', label: 'Categoría', className: 'col-span-6' })}
                    inputProps={{ className: 'w-full', disabled: props.isDisabledFields || selectedStack.stack_id }}
                    selectOptions={categoriesQuery.data
                      .filter((category: ICategory) => !category.is_other_category && category.is_available)
                      .map((category: ICategory) => {
                        return { value: JSON.stringify(category), label: category.name }
                      })}
                  />
                )}
                <SelectField
                  {...setInputDefaultProps({ name: 'skills_options', label: 'Habilidades', className: 'col-span-6' })}
                  selectOptions={skillsList.map((skill: ISkill) => {
                    return { value: JSON.stringify(skill), label: skill.name }
                  })}
                />
              </div>
              <Box className='border border-gray-300 px-4 pb-2 mt-4' height={60} overflow='auto'>
                {selectedStack.skills.map((skill: ISkill) => {
                  return (
                    <Chip
                      key={skill._id}
                      label={skill.name}
                      onDelete={() => removeSkill(skill)}
                      color='primary'
                      className='mr-2 mt-2'
                    />
                  )
                })}
              </Box>
            </Grid>
            <Grid item xs={3} className='flex justify-center mt-2'>
              {selectedStack.stack_id ? (
                <div>
                  <div>
                    <FiButton className='mt-4 block mx-auto' variant='outlined' onClick={editStack}>
                      Editar stack
                    </FiButton>
                  </div>
                  <p className={`body2-medium text-red text-center cursor-pointer mt-2`} onClick={resetSelectedStack}>
                    Cancelar
                  </p>
                </div>
              ) : (
                <div>
                  <FiButton className='mt-4' variant='outlined' onClick={setNewStack}>
                    <AddCircleOutlineIcon className='text-blue mr-1' />
                    Agregrar stack
                  </FiButton>
                </div>
              )}
            </Grid>
          </Grid>
        </>
      )}

      {props.stackList.length > 0 && (
        <>
          <p className='subtitle4-medium mt-4'>Stack seleccionado</p>
          <List className='border-t border-r border-l border-gray-300 py-0 mt-4'>
            {props.stackList.map((stack: Partial<IStack>) => {
              return (
                <ListItem key={stack?.stack_id} className='border-b border-gray-300'>
                  <span className='subtitle3-regular'>{stack?.category?.name}</span>

                  <ListItemSecondaryAction>
                    {stack.has_leave_project ? (
                      <span className='subtitle3-regular text-red'>Stack retirado</span>
                    ) : (
                      <>
                        {!isProjectSuccessOrCancelled && (
                          <>
                            <IconButton edge='end' disabled={props.isDisabledFields} onClick={() => setStackToEdit(stack)}>
                              <FiIcons name='edit' />
                            </IconButton>
                            <IconButton edge='end' disabled={props.isDisabledFields} onClick={() => removeCategory(stack)}>
                              <FiIcons name='skull' />
                            </IconButton>
                          </>
                        )}
                      </>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </>
      )}
    </>
  )
}

export default ProjectStack
