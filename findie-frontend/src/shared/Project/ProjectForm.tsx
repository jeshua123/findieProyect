import { usePlansQuery } from '../../customHooks/request/plansQuery'
import { IPlan } from '../../models/IPlan'
import { TInputProps } from './Project'
import { UseFormReturn } from 'react-hook-form'

import { Grid } from '@material-ui/core'
import InputField from '../../assets/UIkit/Forms/InputField'
import SelectField from '../../assets/UIkit/Forms/SelectField'
import { budgetList } from '../../constants/Cpanel/ProjectConstants'
import ClpField from '../../assets/UIkit/Forms/ClpField'

type TProjectForm = {
  isDisabledFields?: boolean
  form: UseFormReturn<any>
}

const ProjectForm: React.FC<TProjectForm> = (props) => {
  const plansQuery = usePlansQuery({ entity: 'client', is_available: true })

  const setInputDefaultProps = (param: TInputProps) => {
    return {
      name: param.name,
      label: param.label ?? '',
      className: param.className ?? '',
      inputProps: {
        className: `w-full ${param.inputClassName ?? ''}`,
        disabled: props.isDisabledFields,
        placeholder: param.pholder ?? '',
        type: param.type ?? 'text',
      },
      form: props.form,
    }
  }

  return (
    <>
      <InputField
        {...setInputDefaultProps({ name: 'title', label: '1. Título', pholder: 'Ingresa un titulo', className: 'mt-4' })}
        options={{ required: 'Este campo es requerido' }}
      />
      <InputField
        name='brief'
        label='2. Brief'
        textarea
        className='mt-4'
        textareaProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa el brief', rows: 4 }}
        options={{ required: 'Este campo es requerido' }}
        form={props.form}
      />

      <p className='subtitle4-medium mt-2'>3. Plan de trabajo</p>
      <Grid container spacing={2} className='mt-2'>
        <Grid item xs={3}>
          {plansQuery.isSuccess && (
            <SelectField
              {...setInputDefaultProps({ name: 'plan', label: 'Plan Findie' })}
              selectOptions={plansQuery.data.map((plan: IPlan) => {
                return { value: plan._id, label: plan.name }
              })}
              options={{ required: 'Este campo es requerido' }}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          <SelectField
            {...setInputDefaultProps({ name: 'budget', label: 'Tamaño del proyecto' })}
            selectOptions={budgetList.map((budget) => {
              return { value: budget.value, label: budget.label }
            })}
            options={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        <Grid item xs={3}>
          <ClpField
            {...setInputDefaultProps({
              name: 'price.subtotal',
              label: 'Presupuesto',
              type: 'number',
              pholder: '$0.000',
              step: 'any',
            })}
            // options={{ required: 'Este campo es requerido' }}
          />
        </Grid>
        {/* <Grid item xs={3}>
            <InputField {...props.setInputDefaultProps('total_available', 'Total disponible', 'number', '$0.000')} />
          </Grid> */}
      </Grid>
    </>
  )
}

export default ProjectForm
