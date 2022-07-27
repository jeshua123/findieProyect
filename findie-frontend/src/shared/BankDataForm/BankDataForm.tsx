import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Box, Grid } from '@material-ui/core'
import InputField from '../../assets/UIkit/Forms/InputField'
import SelectField from '../../assets/UIkit/Forms/SelectField'

type TBankDataForm = {
  form: UseFormReturn<any>
  role?: any
  isDisabledFields?: boolean
}

const bankList = [
  { _id: 1, name: 'Banco de Chile-Edwards-Citibank' },
  { _id: 2, name: 'Banco Internacional' },
  { _id: 3, name: 'Banco Estado' },
  { _id: 4, name: 'Scotiabank' },
  { _id: 5, name: 'BCI - TBANC' },
  { _id: 6, name: 'Corpbanca' },
  { _id: 7, name: 'Bice' },
  { _id: 8, name: 'HSBC' },
  { _id: 9, name: 'Santander' },
  { _id: 10, name: 'Banco ITAU' },
  { _id: 11, name: 'Banco Security' },
  { _id: 12, name: 'Banco Falabella' },
  { _id: 13, name: 'Banco Consorcio' },
  { _id: 14, name: 'Banco Ripley' },
  { _id: 15, name: 'Scotiabank Azul' },
  { _id: 16, name: 'Banco Coopeuch' },
]

const accountType = [
  { _id: 1, name: 'Corriente' },
  { _id: 2, name: 'Ahorro' },
  { _id: 3, name: 'Vista' },
  { _id: 4, name: 'Rut' },
]

const BankDataForm: React.FC<TBankDataForm> = (props) => {
  useEffect(() => {
    if (props?.role?.isSuccess) {
      props.form.setValue('bank_detail.name', props.role?.data?.bank_detail?.name)
      props.form.setValue('bank_detail.dni', props.role?.data?.bank_detail?.dni)
      props.form.setValue('bank_detail.email', props.role?.data?.bank_detail?.email)
      props.form.setValue('bank_detail.bank_name', props.role?.data?.bank_detail?.bank_name)
      props.form.setValue('bank_detail.account_type', props.role?.data?.bank_detail?.account_type)
      props.form.setValue('bank_detail.account_number', props.role?.data?.bank_detail?.account_number)
    }
  }, [props?.role?.isSuccess])

  return (
    <Box>
      <Grid container className='mt-3' spacing={2}>
        <Grid item lg={4} md={6}>
          <InputField
            name='bank_detail.name'
            label='Nombre'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu nombre' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='bank_detail.dni'
            label='Cedula de identidad'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa cedula' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='bank_detail.email'
            label='Email'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu email', type: 'email' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <SelectField
            name='bank_detail.bank_name'
            label='Banco'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
            selectOptions={bankList.map((bank) => {
              return { value: bank._id, label: bank.name }
            })}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <SelectField
            name='bank_detail.account_type'
            label='Tipo de cuenta'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
            selectOptions={accountType.map((bank) => {
              return { value: bank.name, label: bank.name }
            })}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='bank_detail.account_number'
            label='Numero de cuenta'
            inputProps={{
              className: 'w-full',
              disabled: props.isDisabledFields,
              placeholder: 'Ingresa tu numero de cuenta',
            }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default BankDataForm
