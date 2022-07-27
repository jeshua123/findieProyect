import { Box } from '@material-ui/core'
import { evaluate } from 'decimal-eval'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import ClpField from '../../../assets/UIkit/Forms/ClpField'
import InputField from '../../../assets/UIkit/Forms/InputField'
import SelectField from '../../../assets/UIkit/Forms/SelectField'
import useUf from '../../../customHooks/useUf'
import { cleanCLP, formatDecimal, operation } from '../../../utils/helpers'

const siiOptions = [
  { value: 12.25, label: 'Boleta' },
  { value: 0, label: 'Factura' },
]

const ProjectSimulator: FC = () => {
  const form = useForm()
  const { data: uf } = useUf()
  const freelancerAmount = cleanCLP(form.watch('freelancer_amount'))
  const freelancerFee = +form.watch('freelancer_fee')
  const clientFee = +form.watch('client_fee')
  const freelancerCalcSii = ticketTaxCalculator().tax
  const freelancerCalcFee = calcFreelancerFee(freelancerFee, freelancerAmount).tax
  const freelancerCalcTicket = ticketTaxCalculator().withTax
  const freelancerAmountAfterFee = operation(freelancerAmount, '-', freelancerCalcFee)

  const clientCalcFee = calcFreelancerFee(clientFee, freelancerCalcTicket).tax
  const planFee = +form.watch('plan_fee')
  const planInUf = !planFee ? 0 : uf * planFee

  function ticketTaxCalculator() {
    if (!form.watch('sii') || form.watch('sii') === '0')
      return { tax: 0, withTax: freelancerAmount, withOutTax: freelancerAmount }

    const tax = +evaluate(`${freelancerAmount} * (12.25 / 87.75)`)
    return { tax, withTax: operation(freelancerAmount, '+', tax), withOutTax: operation(freelancerAmount, '-', tax) }
  }

  function calcFreelancerFee(fee: number, price: number) {
    if (!freelancerFee) return { tax: 0, withTax: freelancerAmount, withOutTax: freelancerAmount }

    const tax = +evaluate(`${price} * (${fee / 100})`)
    return { tax, withTax: operation(price, '+', tax), withOutTax: operation(price, '-', tax) }
  }

  function planClientPlan() {
    if (!planFee || planFee === 0) return calcFreelancerFee(clientFee, freelancerCalcTicket).withTax

    return operation(calcFreelancerFee(clientFee, freelancerCalcTicket).withTax, '+', planInUf)
  }

  return (
    <div>
      <h3>Simulador de proyectos</h3>

      <div className='grid grid-cols-12 gap-20'>
        <div className='col-span-6 mt-8'>
          <p className='buttontext4-medium text-red'>Freelancer</p>
          <div className='grid grid-cols-12 gap-2 mt-2'>
            <p className='col-span-6 buttontext4-medium'>Monto a calcular</p>
            <ClpField
              name='freelancer_amount'
              className='col-span-6'
              inputProps={{ className: 'bg-rose border-none text-red' }}
              form={form}
            />
          </div>

          <Box display='grid' gridTemplateColumns='50px 1fr 145px 1fr' className='border-t border-black mt-6'>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>1</p>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>Valor liquido</p>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>CLP</p>
            <p className='body2-medium border-b border-black pl-4 h-12 flex items-center'>${formatDecimal(freelancerAmount)}</p>
          </Box>
          <Box display='grid' gridTemplateColumns='50px 1fr 145px 1fr'>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>2</p>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>Retención SII</p>
            <div className='flex items-center border-r border-b border-black h-12 pl-4'>
              <p className='body2-medium'>%:</p>
              <SelectField
                name='sii'
                className='ml-2'
                selectOptions={siiOptions}
                inputProps={{ className: 'w-24 bg-rose border-none text-red' }}
                form={form}
              />
            </div>
            <p className='body2-medium border-b border-black pl-4 h-12 flex items-center'>${formatDecimal(freelancerCalcSii)}</p>
          </Box>
          <Box display='grid' gridTemplateColumns='50px 1fr 145px 1fr'>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>3</p>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>% Findie</p>
            <div className='flex items-center border-r border-b border-black h-12 pl-4'>
              <p className='body2-medium'>%:</p>
              <InputField
                name='freelancer_fee'
                className='ml-2'
                inputProps={{ className: 'w-24 bg-rose border-none text-red' }}
                form={form}
              />
            </div>
            <p className='body2-medium border-b border-black pl-4 h-12 flex items-center'>${formatDecimal(freelancerCalcFee)}</p>
          </Box>

          <div className='grid grid-cols-12 gap-2 mt-4'>
            <p className='col-span-6 buttontext4-medium self-center'>Hacer boleta por</p>
            <p className='col-span-6 formtext2-regular h-12 flex items-center bg-light-orange2 pl-8'>
              ${formatDecimal(freelancerCalcTicket)}
            </p>
          </div>
          <div className='grid grid-cols-12 gap-2 mt-2'>
            <p className='col-span-6 buttontext4-medium self-center'>Recibe</p>
            <p className='col-span-6 formtext2-regular h-12 flex items-center bg-light-orange2 pl-8'>
              ${formatDecimal(freelancerAmountAfterFee)}
            </p>
          </div>
        </div>

        <div className='col-span-6 mt-8'>
          <p className='buttontext4-medium text-sea-blue'>Cliente</p>
          <div className='grid grid-cols-12 gap-2'>
            <p className='col-span-6 buttontext4-medium self-center'>Monto freelancer</p>
            <p className='col-span-6 formtext2-regular h-12 flex items-center bg-light-orange2 pl-8'>
              ${formatDecimal(freelancerCalcTicket)}
            </p>
          </div>

          <Box display='grid' gridTemplateColumns='50px 1fr 140px 1fr' className='border-t border-black mt-6'>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>1</p>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>% Findie</p>
            <div className='flex items-center border-r border-b border-black h-12 pl-4'>
              <p className='body2-medium'>%:</p>
              <InputField
                name='client_fee'
                className='ml-4'
                inputProps={{ className: 'w-20 bg-rose border-none text-red' }}
                form={form}
              />
            </div>
            <p className='body2-medium border-b border-black pl-4 h-12 flex items-center'>${formatDecimal(clientCalcFee)}</p>
          </Box>
          <Box display='grid' gridTemplateColumns='50px 1fr 140px 1fr'>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>2</p>
            <p className='body2-medium border-r border-b border-black pl-4 h-12 flex items-center'>Plan Findie</p>
            <div className='flex items-center border-r border-b border-black h-12 pl-4'>
              <p className='body2-medium mr-0.5'>UF:</p>
              <InputField
                name='plan_fee'
                className='ml-2'
                inputProps={{ className: 'w-20 bg-rose border-none text-red' }}
                form={form}
              />
            </div>
            <p className='body2-medium border-b border-black pl-4 h-12 flex items-center'>${formatDecimal(planInUf)}</p>
          </Box>

          <div className='grid grid-cols-12 gap-2 mt-4'>
            <p className='col-span-6 buttontext4-medium self-center'>Costo proyecto</p>
            <p className='col-span-6 formtext2-regular h-12 flex items-center bg-light-orange2 pl-8'>
              ${formatDecimal(planClientPlan())}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSimulator
