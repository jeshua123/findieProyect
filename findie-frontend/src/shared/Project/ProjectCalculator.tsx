import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SelectField from '../../assets/UIkit/Forms/SelectField'
import { paymentMethod, siiTaxes } from '../../constants/Cpanel/ProjectConstants'
import { TProjectSections } from './Project'
import { IStack } from '../../models/IProject'
import { formatDecimal } from '../../utils/helpers'
import moment from 'moment'
import { Button, Divider } from '@material-ui/core'
import { IPlan } from '../../models/IPlan'

const ProjectCalculator: FC<TProjectSections> = (props) => {
  const form = useForm()

  const setPriceType = (plan: IPlan | undefined) => {
    if (!plan) return

    const dispatch = {
      uf: `UF${plan.price}`,
      percent: `${plan.price}%`,
      cash: `$${plan.price}`,
    }
    return dispatch[plan.price_type]
  }

  const setCalculator = () => {
    if (!props.project.isSuccess) return

    const body: any = {
      meta: { uf: props.project.data.uf, plan: props.project.data.plan },
      stackList: props.project.data.stack_list,
      price: {
        ...props.project.data.price,
        payment_method: JSON.parse(form.watch('price.payment_method')),
        sii_tax: JSON.parse(form.watch('price.sii_tax')),
      },
    }
    props.calculatorMutation.mutate({ body, _id: props?.project?.data?._id ?? '' })
  }

  useEffect(() => {
    if (!props.project.isSuccess) return

    form.setValue('price.sii_tax', JSON.stringify(props.project.data.price.sii_tax))
    form.setValue('price.payment_method', JSON.stringify(props.project.data.price.payment_method))
  }, [props.project.isSuccess])

  if (!props.project.isSuccess) return null

  return (
    <form onSubmit={form.handleSubmit(setCalculator)}>
      <p className='body1-medium'>SII</p>
      <div className='flex border-b border-black pb-1'>
        {siiTaxes.map((iter) => {
          return (
            <div key={iter.name} className='mr-4'>
              <input
                id='ticket'
                {...form.register('price.sii_tax', { required: 'Este campo es requerido' })}
                value={JSON.stringify(iter)}
                type='radio'
                disabled={props.isDisabledFields}
              />
              <label htmlFor='ticket' className='buttontext4-regular ml-1'>
                {iter.name}: <span className='body1-medium'>{iter.tax}</span>%
              </label>
            </div>
          )
        })}
      </div>

      <div className='flex justify-between'>
        <div>
          <p className='buttontext4-medium mt-8'>Forma de pago</p>
          <SelectField
            {...props.setInputDefaultProps({ name: 'price.payment_method', form, className: 'mt-2 mb-6 w-52' })}
            selectOptions={paymentMethod.map((payment) => {
              return { value: JSON.stringify(payment), label: payment.method }
            })}
            options={{ required: 'Este campo es requerido' }}
          />
        </div>
        {props.uf.data && (
          <p className='buttontext4-medium mt-8'>
            Valor UF ({moment(new Date()).format('DD/MM/YYYY')}):{' '}
            <span className='text-blue'>{formatDecimal(props.uf.data)}</span>
          </p>
        )}
      </div>

      {props.project.isSuccess &&
        props.project.data.stack_list.map((stack: IStack) => {
          const isRemovedStyle = stack.has_leave_project ? 'bg-red-005 text-red' : ''
          return (
            <div
              key={stack.stack_id}
              className={`grid grid-cols-12 border-t border-l border-r border-black px-4 ${isRemovedStyle}`}
            >
              <p className='col-span-4 body1-medium border-r border-black'>
                {stack?.category?.name}-{stack?.freelancer?.name}
              </p>
              <div className='col-span-8 flex justify-between'>
                <p className='body1-medium ml-4'>
                  (
                  {stack?.freelancer?.plan?.is_price_affect_project
                    ? `${stack?.freelancer?.plan.name} ${stack?.freelancer?.plan.fee}%`
                    : 'Plan que no afecta al proyecto'}
                  ) {stack?.payment?.has_promo_ticket && '- Tikket (2%)'}
                </p>
                <p className='body1-medium text-strong-rose'>${formatDecimal(stack?.payment?.price_after_fee)}</p>
              </div>
            </div>
          )
        })}
      <div className='grid grid-cols-12 border border-black px-4'>
        <p className='col-span-4 body1-medium border-r border-black'>Total</p>
        <p className='col-span-8 body1-medium text-right'>
          ${formatDecimal(props.project.data?.price?.total_freelancers_payment)}
        </p>
      </div>

      {/* findie bill */}
      <div className='grid grid-cols-12 border-t border-l border-r border-black bg-gray-026 px-4 mt-6'>
        <p className='col-span-4 body1-medium border-r border-black'>Subtotal</p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props.project.data?.price.subtotal)}</p>
      </div>
      <div className='grid grid-cols-12 border-t border-l border-r border-black px-4'>
        <p className='col-span-4 body1-medium border-r border-black'>
          {props?.project?.data?.plan?.name} fee ({props?.project?.data?.plan?.fee}%)
        </p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props.project.data?.price.plan_fee_amount)}</p>
      </div>
      <div className='grid grid-cols-12 border-t border-l border-r border-black px-4'>
        <p className='col-span-4 body1-medium border-r border-black'>
          {props?.project?.data?.plan?.name} ({setPriceType(props?.project?.data?.plan)})
        </p>
        <p className='col-span-8 body1-medium text-right'>
          ${formatDecimal(props?.project?.data?.price?.plan_price_amount ?? 0)}
        </p>
      </div>
      <div className='grid grid-cols-12 border-t border-l border-r border-black px-4'>
        <p className='col-span-4 body1-medium border-r border-black'>IVA (19%)</p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props?.project?.data?.price.iva)}</p>
      </div>
      <div className='grid grid-cols-12 border-t border-l border-r border-black px-4'>
        <p className='col-span-4 body1-medium border-r border-black'>
          {props?.project?.data?.price.payment_method?.method} ({props?.project?.data?.price.payment_method?.fee}%)
        </p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props?.project?.data?.price?.external_payment ?? 0)}</p>
      </div>
      <div className='grid grid-cols-12 border border-black px-4 bg-gray-026'>
        <p className='col-span-4 body1-medium border-r border-black'>Total proyecto</p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props?.project?.data?.price?.total)}</p>
      </div>

      {/* findie profits */}
      <div className='grid grid-cols-12 border-t border-l border-r border-blue-500 px-4 mt-6'>
        <p className='col-span-4 body1-medium border-r border-blue-500'>Utilidad cliente</p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props.project.data?.profits.client ?? 0)}</p>
      </div>
      <div className='grid grid-cols-12 border-t border-l border-r border-blue-500 px-4'>
        <p className='col-span-4 body1-medium border-r border-blue-500'>Utilidad freelancers</p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props.project.data?.profits.freelancers ?? 0)}</p>
      </div>
      {props.project.data.price.available_budget > 0 && (
        <div className='grid grid-cols-12 border-t border-l border-r border-blue-500 px-4'>
          <p className='col-span-4 body1-medium border-r border-blue-500'>Utilidad otros</p>
          <p className='col-span-8 body1-medium text-right'>${formatDecimal(props.project.data.price.available_budget ?? 0)}</p>
        </div>
      )}
      <div className='grid grid-cols-12 border border-blue-500 px-4 bg-blue-100'>
        <p className='col-span-4 body1-medium border-r border-blue-500'>Total utilidades</p>
        <p className='col-span-8 body1-medium text-right'>${formatDecimal(props.project.data?.profits.total ?? 0)}</p>
      </div>

      <Divider className='mt-8' />
      <div className='flex justify-end mt-4'>
        <Button variant='contained' color='primary' type='submit' disabled={props.isDisabledFields}>
          Modificar calculadora
        </Button>
      </div>
    </form>
  )
}

export default ProjectCalculator
// props.project.data.price.available_budget
