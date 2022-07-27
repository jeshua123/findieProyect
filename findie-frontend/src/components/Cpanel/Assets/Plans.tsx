import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useOpenDialog, { TRequestAction } from '../../../customHooks/useOpenDialog'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { IPlan } from '../../../models/IPlan'
import {
  useDeletePlanMutation,
  usePlansQuery,
  usePostPlanMutation,
  usePutPlanMutation,
} from '../../../customHooks/request/plansQuery'

import AppDialog from '../../../assets/UIkit/AppDialog'
import InputField from '../../../assets/UIkit/Forms/InputField'

import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'
import Tabs from '../../../assets/UIkit/Tabs'

const Plans: React.FC = () => {
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const createForm = useForm<IPlan>()
  const editForm = useForm<IPlan>()
  const [entity, setEntity] = useState<'client' | 'freelancer'>('client')
  const plansQuery = usePlansQuery({ entity })
  const postPlanMutation = usePostPlanMutation()
  const putPlanMutation = usePutPlanMutation()
  const deletePlanMutation = useDeletePlanMutation()
  useRequestAlert(postPlanMutation, createForm)
  useRequestAlert(putPlanMutation, editForm, toogleDialog)
  useRequestAlert(deletePlanMutation, undefined, toogleDialog)
  useSetLoader(plansQuery)

  const tabs = [
    { id: 1, text: `Cliente`, isSelected: true, action: () => setEntity('client') },
    { id: 2, text: `Freelancer`, action: () => setEntity('freelancer') },
  ]

  const openDialog = (plan: IPlan, action: TRequestAction) => {
    setRecuestAction(action)
    toogleDialog(plan)
  }

  const createPlan: SubmitHandler<IPlan> = async (data) => {
    const dataEdited = { ...data, entity, createdAt: new Date().getTime() }
    postPlanMutation.mutate(dataEdited)
  }

  const handlePlan: SubmitHandler<IPlan> = (data) => {
    recuestAction === 'edit' && editPlan(data)
    recuestAction === 'delete' && deletePlan()
    recuestAction === 'suspend' && editPlan({ ...data, is_available: !dialog?.data?.is_available })
  }

  const editPlan = (data: IPlan) => {
    putPlanMutation.mutate({ body: data, _id: dialog.data._id })
  }

  const deletePlan = () => {
    deletePlanMutation.mutate(dialog.data._id)
  }

  useEffect(() => {
    if (dialog.data?.name) {
      editForm.setValue('name', dialog.data.name)
      editForm.setValue('price', dialog.data.price)
      editForm.setValue('price_type', dialog.data.price_type)
      editForm.setValue('fee', dialog.data.fee)
      editForm.setValue('comment', dialog.data.comment)
      editForm.setValue('is_monthly_pay_out', dialog.data.is_monthly_pay_out)
      editForm.setValue('is_price_affect_project', dialog.data.is_price_affect_project)
      editForm.setValue('is_secret', dialog.data.is_secret)
    }
  }, [dialog.data])

  return (
    <>
      <Tabs variant='default' tabs={tabs} className='mb-4' />
      <h3 className='mt-6'>Agrega un plan para {entity === 'client' ? 'clientes' : 'freelancers'}</h3>
      <form onSubmit={createForm.handleSubmit(createPlan)}>
        <Grid container spacing={3}>
          <Grid item xs={8} className='border-r border-gray-400'>
            <Grid container className='mt-4'>
              <Grid item xs={12}>
                <InputField
                  name='name'
                  label='Nombre del plan'
                  inputProps={{ className: 'w-full', placeholder: 'Nombre del plan' }}
                  options={{ required: 'Este campo es requerido' }}
                  form={createForm}
                />
              </Grid>

              <Grid item xs={12} className='mt-4'>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputField
                      name='price'
                      label='Precio'
                      inputProps={{ className: 'w-full', placeholder: 'Agrega un precio al plan', type: 'number' }}
                      options={{ required: 'Este campo es requerido' }}
                      form={createForm}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      name='fee'
                      label='Fee (%)'
                      inputProps={{ className: 'w-full', placeholder: 'Agrega el porcentaje de comisión', type: 'number' }}
                      options={{ required: 'Este campo es requerido' }}
                      form={createForm}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className='mt-4'>
                <InputField
                  name='comment'
                  label='Comentario'
                  textarea
                  textareaProps={{ className: 'w-full', placeholder: 'Agrega un comentario', rows: 2 }}
                  options={{ required: 'Este campo es requerido' }}
                  form={createForm}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <p className='subtitle4-medium mr-8'>Tipo de precio</p>
            <div className='flex items-center'>
              <div className='flex items-center mr-4'>
                <InputField
                  id='price_type_p'
                  name='price_type'
                  inputProps={{ type: 'radio', value: 'percent' }}
                  options={{ required: 'Este campo es requerido' }}
                  form={createForm}
                />
                <label htmlFor='price_type_p' className='body2-medium cursor-pointer mb-2 ml-2'>
                  Porcentaje
                </label>
              </div>
              <div className='flex items-center mr-4'>
                <InputField
                  name='price_type'
                  id='price_type_uf'
                  inputProps={{ type: 'radio', value: 'uf' }}
                  options={{ required: 'Este campo es requerido' }}
                  form={createForm}
                />
                <label htmlFor='price_type_uf' className='body2-medium cursor-pointer mb-2 ml-2'>
                  UF
                </label>
              </div>
              <div className='flex items-center mr-4'>
                <InputField
                  name='price_type'
                  id='price_type_c'
                  inputProps={{ type: 'radio', value: 'cash' }}
                  options={{ required: 'Este campo es requerido' }}
                  form={createForm}
                />
                <label htmlFor='price_type_c' className='body2-medium cursor-pointer mb-2 ml-2'>
                  Pesos
                </label>
              </div>
            </div>
            <p className='subtitle4-medium mr-8'>¿Afecta el precio al proyecto?</p>
            <div className='flex items-center'>
              <div className='flex items-center mr-4'>
                <InputField
                  id='is_price_affect_project'
                  name='is_price_affect_project'
                  inputProps={{ type: 'checkbox' }}
                  form={createForm}
                />
                <label htmlFor='is_price_affect_project' className='body2-medium cursor-pointer mb-2 ml-2'>
                  Si, afecta los proyectos
                </label>
              </div>
            </div>
            <p className='subtitle4-medium mr-8'>¿Se cobra mensualmente?</p>
            <div className='flex items-center'>
              <div className='flex items-center mr-4'>
                <InputField
                  id='is_monthly_pay_out'
                  name='is_monthly_pay_out'
                  inputProps={{ type: 'checkbox' }}
                  form={createForm}
                />
                <label htmlFor='is_monthly_pay_out' className='body2-medium cursor-pointer mb-2 ml-2'>
                  Si, cobro mensual
                </label>
              </div>
            </div>
            <p className='subtitle4-medium mr-8'>¿Es plan secreto?</p>
            <div className='flex items-center'>
              <div className='flex items-center mr-4'>
                <InputField id='is_secret' name='is_secret' inputProps={{ type: 'checkbox' }} form={createForm} />
                <label htmlFor='is_secret' className='body2-medium cursor-pointer mb-2 ml-2'>
                  Si, solo mostrar en el cpanel
                </label>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className='flex justify-end lg:pt-0 pt-2'>
          <Button type='submit' variant='contained' color='primary'>
            Guardar
          </Button>
        </Grid>
      </form>
      <Divider className='my-4' />

      <h3 className='mb-1'>Planes disponibles para {entity === 'client' ? 'clientes' : 'freelancers'}</h3>
      <List className='border-t border-r border-l border-gray-300 py-0 mt-4'>
        {plansQuery.isSuccess &&
          plansQuery.data.map((plan: IPlan) => {
            return (
              <ListItem key={plan._id} className='border-b border-gray-300'>
                <span className='subtitle3-regular'>{plan.name}</span>

                <ListItemSecondaryAction>
                  <IconButton edge='end' onClick={() => openDialog(plan, 'edit')}>
                    <FiIcons name='edit' />
                  </IconButton>
                  <IconButton edge='end' onClick={() => openDialog(plan, 'suspend')}>
                    <FiIcons name='eye' className={`${plan.is_available ? '' : 'svg-white'}`} />
                  </IconButton>
                  <IconButton edge='end' onClick={() => openDialog(plan, 'delete')}>
                    <FiIcons name='skull' />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
      </List>

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'edit' ? 'Editar' : 'Eliminar'} plan`}
        handleClose={toogleDialog}
      >
        <form onSubmit={editForm.handleSubmit(handlePlan)}>
          {recuestAction === 'edit' && (
            <>
              <span className='subtitle4-medium mb-2 block'>El nombre del plan a editar es: {dialog?.data?.name}</span>
              <InputField
                name='name'
                label='Nombre'
                inputProps={{ className: 'w-full', placeholder: 'Nombre del plan' }}
                options={{ required: 'Este campo es requerido' }}
                form={editForm}
              />
              <InputField
                name='price'
                label='Precio'
                inputProps={{ className: 'w-full', placeholder: 'Precio del plan' }}
                form={editForm}
              />
              <InputField
                name='fee'
                label='Fee (%)'
                inputProps={{ className: 'w-full', placeholder: 'Precio del plan' }}
                form={editForm}
              />
              <InputField
                name='comment'
                label='Comentario'
                textarea
                textareaProps={{ className: 'w-full', placeholder: 'Agrega un comentario sobre el plan', rows: 3 }}
                form={editForm}
              />
              <p className='subtitle4-medium mr-8'>Tipo de precio</p>
              <div className='flex items-center'>
                <div className='flex items-center mr-4'>
                  <InputField
                    id='price_type_p'
                    name='price_type'
                    options={{ required: 'Este campo es requerido' }}
                    inputProps={{ type: 'radio', value: 'percent' }}
                    form={editForm}
                  />
                  <label htmlFor='price_type_p' className='body2-medium cursor-pointer mb-2 ml-2'>
                    Porcentaje
                  </label>
                </div>
                <div className='flex items-center mr-4'>
                  <InputField
                    name='price_type'
                    options={{ required: 'Este campo es requerido' }}
                    id='price_type_uf'
                    inputProps={{ type: 'radio', value: 'uf' }}
                    form={editForm}
                  />
                  <label htmlFor='price_type_uf' className='body2-medium cursor-pointer mb-2 ml-2'>
                    UF
                  </label>
                </div>
                <div className='flex items-center mr-4'>
                  <InputField
                    name='price_type'
                    options={{ required: 'Este campo es requerido' }}
                    id='price_type_c'
                    inputProps={{ type: 'radio', value: 'cash' }}
                    form={editForm}
                  />
                  <label htmlFor='price_type_c' className='body2-medium cursor-pointer mb-2 ml-2'>
                    Pesos
                  </label>
                </div>
              </div>
              <p className='subtitle4-medium mr-8'>¿Afecta el precio al proyecto?</p>
              <div className='flex items-center'>
                <div className='flex items-center mr-4'>
                  <InputField
                    id='is_price_affect_project'
                    name='is_price_affect_project'
                    inputProps={{ type: 'checkbox' }}
                    form={editForm}
                  />
                  <label htmlFor='is_price_affect_project' className='body2-medium cursor-pointer mb-2 ml-2'>
                    Si, afecta los proyectos
                  </label>
                </div>
              </div>
              <p className='subtitle4-medium mr-8'>¿Se cobra mensualmente?</p>
              <div className='flex items-center'>
                <div className='flex items-center mr-4'>
                  <InputField
                    id='is_monthly_pay_out'
                    name='is_monthly_pay_out'
                    inputProps={{ type: 'checkbox' }}
                    form={editForm}
                  />
                  <label htmlFor='is_monthly_pay_out' className='body2-medium cursor-pointer mb-2 ml-2'>
                    Si, cobro mensual
                  </label>
                </div>
              </div>
              <p className='subtitle4-medium mr-8'>¿Es plan secreto?</p>
              <div className='flex items-center'>
                <div className='flex items-center mr-4'>
                  <InputField id='is_secret' name='is_secret' inputProps={{ type: 'checkbox' }} form={editForm} />
                  <label htmlFor='is_secret' className='body2-medium cursor-pointer mb-2 ml-2'>
                    Si, solo mostrar en el cpanel
                  </label>
                </div>
              </div>
            </>
          )}
          {recuestAction === 'suspend' && (
            <>
              <span className='subtitle4-medium mb-4 block'>
                ¿Estas seguro que deseas {dialog?.data?.is_available ? 'suspender el plan' : 'activar el plan'}{' '}
                {dialog?.data?.name}?
              </span>
            </>
          )}
          {recuestAction === 'delete' && (
            <>
              <span className='subtitle4-medium mb-4 block'>
                ¿Estas seguro de eliminar el plan {dialog?.data?.name}? <br />
              </span>
              <span className='subtitle4-medium mb-4 block'>
                No podrás revertir este proceso y todos los clientes que tengan este plan perderán el dato y será necesario
                reemplazarlo manualmente a cada uno.
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

export default Plans
