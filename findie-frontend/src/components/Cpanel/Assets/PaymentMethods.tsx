import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useOpenDialog, { TRequestAction } from '../../../customHooks/useOpenDialog'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import {
  useDeleteProjectFeeMutation,
  usePostProjectFeeMutation,
  useProjectFeesQuery,
  usePutProjectFeeMutation,
} from '../../../customHooks/request/PaymentMethodsQuery'
import { IPaymentMethod } from '../../../models/IPaymentMethod'

import AppDialog from '../../../assets/UIkit/AppDialog'
import InputField from '../../../assets/UIkit/Forms/InputField'

import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'

const PaymentMethods: React.FC = () => {
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const createForm = useForm<IPaymentMethod>()
  const editForm = useForm<IPaymentMethod>()
  const projectFeeQuery = useProjectFeesQuery()
  const postProjectFeeMutation = usePostProjectFeeMutation()
  const putProjectFeeMutation = usePutProjectFeeMutation()
  const deleteProjectFeeMutation = useDeleteProjectFeeMutation()
  useRequestAlert(postProjectFeeMutation, createForm)
  useRequestAlert(putProjectFeeMutation, editForm, toogleDialog)
  useRequestAlert(deleteProjectFeeMutation, undefined, toogleDialog)
  useSetLoader(projectFeeQuery)

  const openDialog = (fee: IPaymentMethod, action: TRequestAction) => {
    setRecuestAction(action)
    toogleDialog(fee)
  }

  const createFee: SubmitHandler<IPaymentMethod> = async (data) => {
    const dataEdited = {
      ...data,
      createdAt: new Date().getTime(),
    }
    postProjectFeeMutation.mutate(dataEdited)
  }

  const handleFee: SubmitHandler<IPaymentMethod> = (data) => {
    recuestAction === 'edit' && editFee(data)
    recuestAction === 'delete' && deleteFee()
    recuestAction === 'suspend' && editFee({ ...data, is_available: !dialog.data.is_available })
  }

  const editFee = (data: IPaymentMethod) => {
    putProjectFeeMutation.mutate({ body: data, _id: dialog.data._id })
  }

  const deleteFee = () => {
    deleteProjectFeeMutation.mutate(dialog.data._id)
  }

  useEffect(() => {
    if (dialog.data?.name) {
      editForm.setValue('name', dialog.data.name)
      editForm.setValue('fee', dialog.data.fee)
    }
  }, [dialog.data])

  return (
    <>
      <h3 className='mt-6'>Agrega un metodo de pago</h3>
      <form onSubmit={createForm.handleSubmit(createFee)}>
        <Grid container spacing={2}>
          <Grid item xs={3} className='mt-4'>
            <InputField
              name='name'
              label='Nombre'
              inputProps={{ className: 'w-full', placeholder: 'Tipo de proyecto' }}
              options={{ required: 'Este campo es requerido' }}
              form={createForm}
            />
          </Grid>
          <Grid item xs={3} className='mt-4'>
            <InputField
              name='fee'
              label='Fee (%)'
              inputProps={{ className: 'w-full', placeholder: 'Agrega un fee', step: 'any' }}
              options={{ required: 'Este campo es requerido' }}
              form={createForm}
            />
          </Grid>
          <Grid item xs={12} className='flex justify-end lg:pt-0 pt-2'>
            <Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider className='my-4' />

      <h3 className='mb-1'>Metodos de pago</h3>
      <List className='border-t border-r border-l border-gray-300 py-0 mt-4'>
        {projectFeeQuery.isSuccess &&
          projectFeeQuery.data.map((fee: IPaymentMethod) => {
            return (
              <ListItem key={fee._id} className='border-b border-gray-300'>
                <span className='subtitle3-regular'>{fee.name}</span>

                <ListItemSecondaryAction>
                  <IconButton edge='end' onClick={() => openDialog(fee, 'edit')}>
                    <FiIcons name='edit' />
                  </IconButton>
                  <IconButton edge='end' onClick={() => openDialog(fee, 'suspend')}>
                    <FiIcons name='eye' className={`${fee.is_available ? '' : 'svg-white'}`} />
                  </IconButton>
                  <IconButton edge='end' onClick={() => openDialog(fee, 'delete')}>
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
        <form onSubmit={editForm.handleSubmit(handleFee)}>
          {recuestAction === 'edit' && (
            <>
              <span className='subtitle4-medium mb-2 block'>El nombre del fee a editar es: {dialog?.data?.name}</span>
              <InputField
                name='name'
                label='Nombre'
                className='mt-2'
                inputProps={{ className: 'w-full', placeholder: 'Tipo de proyecto' }}
                options={{ required: 'Este campo es requerido' }}
                form={editForm}
              />
              <InputField
                name='fee'
                label='Fee'
                className='mt-2'
                inputProps={{ className: 'w-full', placeholder: 'Agrega un fee' }}
                form={editForm}
              />
            </>
          )}
          {recuestAction === 'suspend' && (
            <>
              <span className='subtitle4-medium mb-4 block'>
                ¿Estas seguro que deseas{' '}
                {dialog?.data?.is_available ? 'suspender el metodo de pago' : 'activar el metodo de pago'}
                {dialog?.data?.name}?
              </span>
            </>
          )}
          {recuestAction === 'delete' && (
            <>
              <span className='subtitle4-medium mb-4 block'>
                ¿Estas seguro de eliminar el metodo de pago {dialog?.data?.name}? <br />
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

export default PaymentMethods
