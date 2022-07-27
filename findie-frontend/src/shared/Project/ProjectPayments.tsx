import { FC, useEffect, useMemo, useState } from 'react'
import { IStack } from '../../models/IProject'
import { TProjectSections } from './Project'
import { SubmitHandler, useForm } from 'react-hook-form'
import { cleanCLP, formatDecimal, operation } from '../../utils/helpers'
import { useSnackbar } from 'notistack'
import useOpenDialog, { TRequestAction } from '../../customHooks/useOpenDialog'
import moment from 'moment'

import { Box, Button, Divider, Grid } from '@material-ui/core'
import Tabs, { TTab } from '../../assets/UIkit/Tabs'
import { IPayment } from '../../models/IPayment'
import { FiIcons } from '../../assets/UIkit/Icons/FiIcons'
import AppDialog from '../../assets/UIkit/AppDialog'
import { PaymentsActions } from './ProjectDialogactions'

const defaultValues = {
  title: '',
  amount: '',
  createdAt: '',
}

const ProjectPayments: FC<TProjectSections> = (props) => {
  const form = useForm({ defaultValues })
  const snackbar = useSnackbar()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const [stack, setStack] = useState<IStack>()

  const tabs: TTab[] = useMemo(() => {
    if (!props.project.isSuccess) return []

    !stack && setStack(props.project.data.stack_list[0])
    return props.project.data.stack_list.map((stack: IStack, index: number) => {
      return {
        id: index + 1,
        text: `${stack?.freelancer?.name} ${stack?.freelancer?.lastName}`,
        isSelected: index === 0,
        action: () => setStack(stack),
      }
    })
  }, [props.project])

  const projectAmountToPay = () => {
    if (!props.project.data) return
    const amountToPay = props.project.data.stack_list.reduce((acum: number, stack: IStack) => {
      return (acum = operation(stack.payment.price_after_fee, '+', acum))
    }, 0)
    return formatDecimal(amountToPay)
  }

  const projectPaymentStatus = () => {
    if (!props.project.data) return
    const totalProjectPayments = props.project.data.stack_list.reduce((acum: number, stack: IStack) => {
      const totalFreelancerPayments = stack.payments.reduce((freelancerAcum: number, payment: IPayment) => {
        return (freelancerAcum = operation(freelancerAcum, '+', payment.amount))
      }, 0)
      return (acum = operation(totalFreelancerPayments, '+', acum))
    }, 0)
    return formatDecimal(totalProjectPayments)
  }

  const paymentStatus = () => {
    if (!stack) return { totalPayments: 0, debs: 0 }

    const totalPayments = stack?.payments.reduce((acum: number, payment: IPayment) => {
      return (acum = acum + payment.amount)
    }, 0)
    const debs = operation(stack.payment.price_after_fee, '-', totalPayments)
    return { totalPayments: formatDecimal(totalPayments), debs }
  }

  const openDialog = (action: TRequestAction, payment?: IPayment) => {
    setRecuestAction(action)
    toogleDialog(payment)
  }

  const closeDialog = () => {
    form.reset(defaultValues)
    form.clearErrors()
    toogleDialog()
    setRecuestAction('post')
  }

  const saveOrEditOrDelete: SubmitHandler<IPayment> = (data) => {
    const dispatch: { [key: string]: () => void } = {
      post: () => savePayment(data),
      edit: () => editPayment(data),
      delete: () => deletePayment(),
    }
    dispatch[recuestAction]()
  }

  const savePayment = (data: IPayment) => {
    if (!stack) return

    const body = {
      ...data,
      amount: cleanCLP(data.amount),
      freelancer: stack?.freelancer?._id,
      project: props.project.data?._id ?? '',
      createdAt: new Date(data.createdAt).getTime(),
    }
    props.postPaymentMutation.mutate(body, {
      onSuccess: (res) => {
        if (!props.project.isSuccess) return

        const stack_list = props.project.data.stack_list.map((currentStack: IStack) => {
          if (currentStack.stack_id === stack.stack_id) {
            return { ...currentStack, payments: [...currentStack.payments, res] }
          }
          return currentStack
        })

        props.updateProjectMutation.mutate(
          { body: { stack_list }, _id: props.project.data?._id ?? '' },
          {
            onSuccess: () => {
              form.reset(defaultValues)
              toogleDialog()
            },
          }
        )
      },
    })
  }

  const editPayment = (data: IPayment) => {
    const body = { ...data, amount: cleanCLP(data.amount), createdAt: new Date(data.createdAt).getTime() }
    props.putPaymentMutation.mutate(
      { body, _id: dialog?.data?._id ?? '' },
      {
        onSuccess: () => afterMutation(),
      }
    )
  }

  const deletePayment = () => {
    props.deletePaymentMutation.mutate(dialog.data._id, {
      onSuccess: () => afterMutation(),
    })
  }

  const afterMutation = () => {
    form.reset()
    form.clearErrors()
    setRecuestAction('post')
    toogleDialog()
  }

  useEffect(() => {
    if (recuestAction === 'edit') {
      form.setValue('title', dialog.data.title)
      form.setValue('amount', dialog.data.amount)
      form.setValue('createdAt', moment(dialog.data.createdAt).format('YYYY-MM-DD'))
    }
  }, [recuestAction])

  useEffect(() => {
    props.postPaymentMutation.isError && snackbar.enqueueSnackbar('Hubo un error. Intentalo nuevamente', { variant: 'error' })
  }, [props.postPaymentMutation.isError])

  useEffect(() => {
    if (props.project.isSuccess && stack) {
      const newStack = props.project.data.stack_list.find((currentStack: IStack) => currentStack.stack_id === stack?.stack_id)
      setStack(newStack ?? stack)
    }
  }, [props.project?.data?.stack_list])

  return (
    <>
      <Grid container className='mt-4 mb-8' spacing={2}>
        <Grid item xs={4}>
          <p className='subtitle4-medium'>Tolal proyecto: ${projectAmountToPay()}</p>
        </Grid>
        <Grid item xs={4}>
          <p className='subtitle4-medium'>Total pagado: ${projectPaymentStatus()}</p>
        </Grid>
      </Grid>

      {props.project.isSuccess && <Tabs tabs={tabs} variant='default' className='mt-4' />}
      <div
        className={`grid grid-cols-12 mt-6 gap-4 ${
          stack?.has_leave_project ? 'border border-red-400 bg-red-005 p-4 rounded-xl' : ''
        }`}
      >
        <div className='col-span-7'>
          <p className='buttontext1-semibold'>
            Valor acordado: <span className='buttontext1-medium'>{formatDecimal(stack?.payment.price_after_fee)}</span>
          </p>

          {stack &&
            stack.payments.map((payment: IPayment) => {
              return (
                <div key={payment._id} className='grid grid-cols-12 mt-2'>
                  <p className='col-span-4 self-center body2-regular'>{payment.title}</p>
                  <p className='col-span-3 self-center body2-regular text-right'>{formatDecimal(payment.amount)}</p>
                  <p className='col-span-3 self-center body2-regular text-right'>
                    {moment(payment.createdAt).format('DD-MM-YYYY')}
                  </p>
                  {!stack?.has_leave_project && props.project.data?.project_status === 'in_progress' && (
                    <div className='col-span-2 flex justify-end'>
                      <FiIcons name='edit' className='mr-2 cursor-pointer' onClick={() => openDialog('edit', payment)} />
                      <FiIcons name='skull' className='cursor-poiner' onClick={() => openDialog('delete', payment)} />
                    </div>
                  )}
                </div>
              )
            })}

          {paymentStatus().debs !== 0 && (
            <Button
              variant='outlined'
              className='mt-4'
              color='primary'
              onClick={() => openDialog('post')}
              disabled={props.isDisabledFields}
            >
              Agregar pago
            </Button>
          )}
        </div>

        <div className='col-span-5'>
          <div className='flex justify-between bg-light-gray px-2 py-2'>
            <p className='buttontext1-semibold'>Total pagado</p>
            <p className='body2-medium'>{paymentStatus().totalPayments}</p>
          </div>
          {stack?.has_leave_project ? (
            <p className='buttontext1-semibold text-red mt-4'>Freelance retirado del proyecto</p>
          ) : (
            <div
              className={`flex justify-between p-2 ${
                paymentStatus().debs === 0 ? 'text-white bg-blue' : 'text-red bg-light-gray'
              }`}
            >
              <span className='body2-medium'>Debe</span>
              <span className='body2-medium'>{formatDecimal(paymentStatus().debs)}</span>
            </div>
          )}
        </div>
      </div>

      <AppDialog open={dialog.isOpen} title={`Pagos`} handleClose={closeDialog}>
        <form onSubmit={form.handleSubmit(saveOrEditOrDelete)}>
          <PaymentsActions dialog={dialog} form={form} recuestAction={recuestAction} paymentStatus={paymentStatus} />

          <Divider className='mt-4' />
          <Box display='flex' justifyContent='flex-end' mt={2}>
            <Button variant='contained' className='mr-4' onClick={closeDialog}>
              Cancelar
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Aceptar
            </Button>
          </Box>
        </form>
      </AppDialog>
    </>
  )
}

export default ProjectPayments
