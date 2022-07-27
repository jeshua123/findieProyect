import { useEffect, useMemo, useState } from 'react'
import { TInputProps, TProjectSections, TProjectView } from './Project'
import { IFreelancer } from '../../models/IFreelancer'
import { billingPlan, freelancerTaxes, meetingsDays } from '../../constants/Cpanel/ProjectConstants'
import { IProject, IStack } from '../../models/IProject'
import { useFreelancersFetch } from '../../customHooks/request/freelancersQuery'
import { useForm } from 'react-hook-form'
import { cleanCLP, formatDecimal, operation } from '../../utils/helpers'
import useOpenDialog, { TRequestAction } from '../../customHooks/useOpenDialog'

import { Box, Button, Divider, Grid } from '@material-ui/core'
import InputField from '../../assets/UIkit/Forms/InputField'
import AppDialog from '../../assets/UIkit/AppDialog'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import SelectField from '../../assets/UIkit/Forms/SelectField'
import Tabs, { TTab } from '../../assets/UIkit/Tabs'
import FiButton from '../../assets/UIkit/FiButton'
import { AddTicketToStack, SuspendFreelancerStack } from './ProjectDialogactions'
import ClpField from '../../assets/UIkit/Forms/ClpField'

const Projectfreelancers: React.FC<TProjectSections & { setprojectView: React.Dispatch<React.SetStateAction<TProjectView>> }> = (
  props
) => {
  const setInputDefaultProps = props.setInputDefaultProps
  const form = useForm()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const freelancersQuery = useFreelancersFetch()
  const [stack, setStack] = useState<IStack>()
  const [areYouSure, setAreYouSure] = useState<boolean>(false)
  const [freelancers, setfreelancers] = useState<IFreelancer[]>([])

  const meetDay = (key: string) => form.watch(key)

  const tabs: TTab[] = useMemo(() => {
    if (props.project.isSuccess) {
      !stack && setStack(props.project.data.stack_list[0])
      return props.project.data.stack_list.map((stack: IStack, index: number) => {
        return { id: index + 1, text: `Freelancer ${index + 1}`, isSelected: index === 0, action: () => setStack(stack) }
      })
    }
    return []
  }, [props.project])

  const setFormValues = async () => {
    if (stack) {
      form.setValue('stack.payment.has_promo_ticket', stack?.payment.has_promo_ticket ?? false)
      if (!stack?.freelancer?.name) {
        const res = await freelancersQuery({ category: stack?.category._id })
        setfreelancers(res.data)
      }
      form.setValue('category_stack', stack?.category?.name ?? '')
      form.setValue('freelancer_selected', stack?.freelancer?.name ?? '')
      form.setValue('stack.freelancer', stack?.freelancer?._id ?? '')
      form.setValue('freelancer_price', stack?.payment.price ?? '')
      form.setValue('stack.hour_price', stack?.hour_price ?? '')
      form.setValue('stack.billing_plan', stack?.billing_plan ?? '')
      form.setValue('stack.meetings_hours.from', stack?.meetings_hours?.from ?? '')
      form.setValue('stack.meetings_hours.to', stack?.meetings_hours?.to ?? '')
      form.setValue('stack.payment.tax_type', stack?.payment?.tax_type ?? '')
      meetingsDays.forEach((day: string) => form.setValue(day, false))
      stack.meeting_days.forEach((day: string) => form.setValue(day, true))
    }
  }

  const setMeetingDays = () => {
    let meetingList: string[] = []
    meetingsDays.forEach((day: string) => {
      meetDay(day) && meetingList.push(day)
    })
    form.setValue('stack.meeting_days', meetingList)
  }

  const updateFreelancer = (data: any) => {
    console.log(data.stack.payment.price)
    const body = {
      ...data,
      stack_id: stack?.stack_id,
      is_promo_ticket_already_removed: stack?.is_promo_ticket_already_removed,
      stack: { ...data.stack, payment: { ...data.stack.payment, price: cleanCLP(data.stack.payment.price) } },
    }
    props.stackMutation.mutate(
      { body, _id: props.project.data?._id ?? '' },
      {
        onSuccess: (res) => {
          const newstack = res.stack_list.find((currentStack: IStack) => currentStack.stack_id === stack?.stack_id)
          setStack(newstack ? newstack : stack)
        },
      }
    )
  }

  const priceValidation = () => {
    const budget = operation(props?.project?.data?.price.available_budget ?? 0, '+', stack?.payment.price ?? 0)
    return props.project.data && cleanCLP(form.watch('freelancer_price')) > budget
  }

  const openDialog = (action: TRequestAction) => {
    setRecuestAction(action)
    toogleDialog(stack)
  }

  const ticketOrRemove = () => {
    recuestAction === 'edit' && handleTicket()
    recuestAction === 'suspend' && suspendStack()
  }

  const handleTicket = () => {
    form.setValue('stack.payment.has_promo_ticket', true)
    toogleDialog()
  }

  const suspendStack = () => {
    if (!stack) return
    props.suspendStackQuery.mutate(
      { body: stack, _id: props.project.data?._id ?? '' },
      {
        onSuccess: (res) => {
          const newstack = res.stack_list.find((currentStack: IStack) => currentStack.stack_id === stack?.stack_id)
          setStack(newstack ? newstack : stack)
          form.setValue('freelancer_suspend_price', '')
          toogleDialog()
        },
      }
    )
  }

  const setInputDefaultProps2 = (param: TInputProps) => {
    return {
      name: param.name,
      label: param.label ?? '',
      className: param.className ?? '',
      inputProps: {
        className: `w-full ${param.inputClassName ?? ''}`,
        disabled: props.isDisabledFields || stack?.has_leave_project,
        placeholder: param.pholder ?? '',
        type: param.type ?? 'text',
      },
      form: form,
    }
  }

  const closeDialog = () => {
    toogleDialog()
    setAreYouSure(false)
  }

  useEffect(() => {
    setFormValues()
  }, [stack])

  useEffect(() => {
    form.setValue('stack.payment.price', form.watch('freelancer_price'))
    form.clearErrors()
  }, [form.watch('freelancer_price')])

  useEffect(() => {
    form.setValue('stack.payment.price', form.watch('freelancer_suspend_price'))
    form.clearErrors()
  }, [form.watch('freelancer_suspend_price')])

  useEffect(() => {
    setMeetingDays()
  }, [meetDay('Lun'), meetDay('Mar'), meetDay('Mie'), meetDay('Jue'), meetDay('Vie')])

  return (
    <>
      <div className='flex justify-between'>
        <Grid container className='mt-4 mb-8' spacing={2}>
          <Grid item xs={4}>
            <p className='subtitle4-medium'>Tolal disponible: ${formatDecimal(props?.project?.data?.price?.subtotal)}</p>
          </Grid>
          <Grid item xs={4}>
            <p className='subtitle4-medium'>A disposición: ${formatDecimal(props.project.data?.price.available_budget)}</p>
          </Grid>
        </Grid>
        <div className='w-80 self-center'>
          {!stack?.has_leave_project && (
            <FiButton
              className='ml-auto block'
              theme='danger'
              variant='outlined'
              onClick={() => openDialog('suspend')}
              disabled={props.isDisabledFields}
            >
              Retirar a {stack?.freelancer?.name} del proyecto
            </FiButton>
          )}
        </div>
      </div>

      {props.project.isSuccess && props.project.data.stack_list.length > 0 ? (
        <form onSubmit={form.handleSubmit(updateFreelancer)}>
          <Tabs tabs={tabs} variant='default' />

          <div
            className={`grid grid-cols-12 gap-4 mt-4  ${
              stack?.has_leave_project ? 'border border-red-400 bg-red-005 rounded-xl p-2' : ''
            }`}
          >
            <Grid container className={`col-span-9`} spacing={2}>
              {stack?.has_leave_project && (
                <Grid item xs={12}>
                  <h5 className='text-red'>Freelancer retirado del proyecto</h5>
                </Grid>
              )}
              <Grid item xs={4}>
                <InputField {...setInputDefaultProps({ name: 'category_stack', label: 'Catogoría', form, isDisabled: true })} />
              </Grid>
              <Grid item xs={4}>
                {stack?.freelancer?._id ? (
                  <InputField
                    {...setInputDefaultProps({ name: 'freelancer_selected', label: 'Nombre', form, isDisabled: true })}
                  />
                ) : (
                  <SelectField
                    {...setInputDefaultProps({ name: 'stack.freelancer', label: 'Nombre', form })}
                    selectOptions={freelancers
                      .filter((freelancer: IFreelancer) => freelancer?.plan?._id && freelancer.freelancer_status === 'available')
                      .map((freelancer: IFreelancer) => {
                        return { value: freelancer._id, label: `${freelancer.name} ${freelancer.lastName}` }
                      })}
                    options={{ required: 'Este campo es requerido' }}
                  />
                )}
              </Grid>
              <Grid item xs={4}>
                <p className='subtitle4-medium'>Plan Findie</p>
                <p className='subtitle4-medium text-blue'>{stack?.freelancer?.plan?.name}</p>
              </Grid>

              <Grid item xs={4}>
                <ClpField
                  {...setInputDefaultProps2({
                    name: 'freelancer_price',
                    label: 'Monto liquido',
                    type: 'number',
                    pholder: '$0.000',
                    step: 'any',
                  })}
                  options={{
                    required: 'Este campo es requerido',
                    validate: () => {
                      if (priceValidation()) {
                        return 'El monto supera el restante por asignar del presupuesto'
                      }
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  {...setInputDefaultProps({
                    name: 'stack.hour_price',
                    label: 'Valor hora',
                    pholder: 'Ingresa un monto',
                    type: 'number',
                    step: 'any',
                    isDisabled: props.isDisabledFields || stack?.has_leave_project,
                    form,
                  })}
                />
              </Grid>
              <Grid item xs={4}>
                {form.watch('stack.payment.has_promo_ticket') ? (
                  <>
                    <p className='subtitle4-medium'>Ticket usado</p>
                    <CardGiftcardIcon fontSize='large' className='text-soft-green mt-1' />
                  </>
                ) : (
                  <>
                    <p className='subtitle4-medium'>Ticket disponibles: {stack?.freelancer?.simple_tickets?.length}</p>
                    {stack?.freelancer && stack?.freelancer?.simple_tickets?.length ? (
                      <Button
                        className='mt-2'
                        variant='contained'
                        color='primary'
                        size='small'
                        disabled={props.isDisabledFields || stack?.has_leave_project}
                        onClick={() => openDialog('edit')}
                      >
                        Usar ticket
                      </Button>
                    ) : (
                      <p className='subtitle4-medium text-red'>Sin tickets disponbles</p>
                    )}
                  </>
                )}
              </Grid>

              <Grid item xs={4}>
                <SelectField
                  {...setInputDefaultProps({
                    name: 'stack.billing_plan',
                    label: 'Plan facturación',
                    form,
                    isDisabled: props.isDisabledFields || stack?.has_leave_project,
                  })}
                  selectOptions={billingPlan.map((plan: string) => {
                    return { value: plan, label: plan }
                  })}
                />
              </Grid>
              <Grid item xs={4}>
                <p className='subtitle4-medium'>Reuniones</p>
                <div className='flex justify-around mt-4'>
                  {meetingsDays.map((day: string, index: number) => {
                    return (
                      <div key={day} className='total-center flex-col'>
                        <input
                          id={`${day}-${index}`}
                          {...form.register(day)}
                          type='checkbox'
                          disabled={props.isDisabledFields || stack?.has_leave_project}
                        />
                        <label htmlFor={`${day}-${index}`} className='body2-medium'>
                          {day}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </Grid>
              <Grid item xs={4}>
                <p className='subtitle4-medium'>Disponibilidad</p>
                <div className='flex items-center justify-between'>
                  <InputField
                    {...setInputDefaultProps({
                      name: 'stack.meetings_hours.from',
                      form,
                      isDisabled: props.isDisabledFields || stack?.has_leave_project,
                    })}
                  />
                  <p className='subtitle4-medium mx-4'>-</p>
                  <InputField
                    {...setInputDefaultProps({
                      name: 'stack.meetings_hours.to',
                      form,
                      isDisabled: props.isDisabledFields || stack?.has_leave_project,
                    })}
                  />
                </div>
              </Grid>
            </Grid>
            {stack?.freelancer?._id && (
              <div className='col-span-12'>
                <p className='body1-medium'>SII</p>
                <div className='flex border-b border-black pb-1'>
                  {freelancerTaxes.map((iter) => {
                    return (
                      <div key={iter.name} className='mr-4'>
                        <input
                          id='tax_type'
                          {...form.register('stack.payment.tax_type', { required: 'Este campo es requerido' })}
                          value={iter.value}
                          type='radio'
                          disabled={props.isDisabledFields}
                        />
                        <label htmlFor='tax_type' className='buttontext4-regular ml-1'>
                          {iter.name}
                        </label>
                      </div>
                    )
                  })}
                </div>

                <p className='buttontext4-medium mt-4 rounded-xl bg-light-blue-03 p-2'>
                  {stack?.freelancer?.name} {stack?.freelancer?.lastName} con el plan{' '}
                  <span className='text-blue'>{stack?.freelancer?.plan?.name},</span>
                  {stack?.freelancer?.plan?.is_price_affect_project
                    ? ` tiene un fee del ${stack?.freelancer?.plan?.fee}%. `
                    : ' no afecta al proyecto asi que no recibimos utilidad. '}
                  {stack?.payment?.has_promo_ticket && 'Tambien usó un Ticket y resta el 2% al fee de su plan.'}
                </p>
                <div className='grid grid-cols-12 border-t border-l border-r border-black bg-gray-026 px-4 mt-2'>
                  <p className='col-span-4 body1-medium border-r border-black'>Monto liquido</p>
                  <p className='col-span-8 body1-medium text-right'>${formatDecimal(stack?.payment?.price)}</p>
                </div>
                <div className='grid grid-cols-12 border-t border-l border-r border-black px-4'>
                  <p className='col-span-4 body1-medium border-r border-black'>Impuesto</p>
                  <p className='col-span-8 body1-medium text-right'>${formatDecimal(stack?.payment?.sii_tax)}</p>
                </div>
                <div className='grid grid-cols-12 border-t border-l border-r border-black px-4'>
                  <p className='col-span-4 body1-medium border-r border-black'>Findie paga</p>
                  <p className='col-span-8 body1-medium text-right'>${formatDecimal(stack?.payment?.price_after_fee)}</p>
                </div>
                <div className='grid grid-cols-12 border border-black px-4 bg-gray-026'>
                  <p className='col-span-4 body1-medium border-r border-black'>Total cobro al cliente</p>
                  <p className='col-span-8 body1-medium text-right'>${formatDecimal(stack?.payment?.total_price)}</p>
                </div>
              </div>
            )}
          </div>

          <Divider className='mt-8' />
          <div className='flex justify-end mt-4'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={props.isDisabledFields || stack?.has_leave_project}
            >
              Modificar freelancer
            </Button>
          </div>
        </form>
      ) : (
        <h5 className='text-red'>¡Primero debes agregar un stack de trabajo al proyecto!</h5>
      )}

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'suspend' ? `Retirar freelancer` : 'Agregar ticket'}`}
        handleClose={closeDialog}
      >
        <form onSubmit={form.handleSubmit(ticketOrRemove)}>
          {recuestAction === 'suspend' && <SuspendFreelancerStack areYouSure={areYouSure} stack={stack} />}
          {recuestAction === 'edit' && <AddTicketToStack />}

          <Divider className='mt-4' />

          <Box display='flex' justifyContent='flex-end' mt={2}>
            <Button variant='contained' className='mr-4' onClick={closeDialog}>
              Cancelar
            </Button>
            {recuestAction === 'suspend' && !areYouSure && (
              <Button type='button' variant='contained' color='primary' onClick={() => setAreYouSure(true)}>
                Si, ya hice el procedimiento
              </Button>
            )}
            {(areYouSure || recuestAction === 'edit') && (
              <Button type='submit' variant='contained' color='primary'>
                {recuestAction === 'suspend' ? `Retirar freelancer` : 'Aceptar'}
              </Button>
            )}
          </Box>
        </form>
      </AppDialog>
    </>
  )
}

export default Projectfreelancers
