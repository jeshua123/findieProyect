import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { UseQueryResult } from 'react-query'
import { IClient } from '../../models/IClient'
import { industries } from '../../constants/Cpanel/ClientesConstant'
import moment from 'moment'

import { Box, Grid } from '@material-ui/core'
import SelectField from '../../assets/UIkit/Forms/SelectField'
import InputField from '../../assets/UIkit/Forms/InputField'

type TClientsForm = {
  form: UseFormReturn<any>
  client?: UseQueryResult<IClient, unknown>
  isDisabledFields?: boolean
}

const ClientsForm: React.FC<TClientsForm> = (props) => {
  useEffect(() => {
    if (props?.client?.isSuccess) {
      const fieldList = Object.entries(props?.client?.data)
      fieldList.forEach((field: any[]) => {
        if (field[0] === 'createdAt') {
          props.form.setValue(field[0], moment(field[1]).format('YYYY-MM-DD'))
          return
        }
        if (field[0] === 'favorite_freelancer') {
          props.form.setValue('favoriteFreelancer', `${field[1].name} ${field[1].lastName}`)
          return
        }
        props.form.setValue(field[0], field[1])
      })
    }
  }, [props?.client?.isSuccess])

  return (
    <Box>
      <Grid container className='mt-6' spacing={2}>
        <Grid item lg={4} md={6}>
          <InputField
            name='companyName'
            label='Nombre Empresa'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa el nombre de la empresa' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='job_title'
            label='Cargo'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu cargo' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='createdAt'
            label='Fecha de ingreso'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, type: 'date' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='name'
            label='Nombre'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu nombre' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='lastName'
            label='Apellido'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu apellido' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='invitation_ticket'
            label='Ticket Invitación'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa el ticket' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='email'
            label='Email'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu email', type: 'email' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='phone'
            label='Teléfono'
            inputProps={{
              className: 'w-full',
              disabled: props.isDisabledFields,
              placeholder: 'Ingresa tu telefono',
              type: 'number',
            }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='webSite'
            label='Sitio web'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu website' }}
            form={props.form}
          />
        </Grid>
        {props?.client?.data?.favorite_freelancer?._id && (
          <Grid item lg={4} md={6}>
            <InputField
              name='favoriteFreelancer'
              label='Freelancer seleccionado'
              inputProps={{
                className: 'w-full',
                disabled: true,
              }}
              form={props.form}
            />
          </Grid>
        )}
        <Grid item lg={4} md={6}>
          <SelectField
            name='industry'
            label='Industria'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
            selectOptions={industries.map((industry) => {
              return { value: industry.name, label: industry.name }
            })}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClientsForm
