import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IFreelancer } from '../../../models/IFreelancer'

import { Box, Grid, Switch, Button, Divider } from '@material-ui/core'
import InputField from '../../../assets/UIkit/Forms/InputField'

type TFreelancerAditionalInfo = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  putFreelancerMutation: UseMutationResult<{ data: IFreelancer }, unknown, { body: Partial<IFreelancer>; _id: string }, unknown>
}

const FreelancerAditionalInfo: React.FC<TFreelancerAditionalInfo> = (props) => {
  const form = useForm()

  const editFreelancer: SubmitHandler<IFreelancer> = (data) => {
    const body = {
      ...data,
      //@ts-ignore
      is_available_to_work: data.is_available_to_work === 'true' ? true : false,
      //@ts-ignore
      is_hidden: data.is_hidden === 'true' ? true : false,
    }
    props.putFreelancerMutation.mutate({ body, _id: props.freelancerId })
  }

  useEffect(() => {
    if (props?.freelancer?.isSuccess) {
      form.setValue('biography', props.freelancer?.data?.biography)
      form.setValue('college_degree', props.freelancer?.data?.college_degree)
      form.setValue('experience_level', props.freelancer?.data?.experience_level)
      form.setValue('is_available_to_work', props.freelancer?.data?.is_available_to_work ? 'true' : 'false')
      form.setValue('is_hidden', props.freelancer?.data?.is_hidden ? 'true' : 'false')
    }
  }, [props?.freelancer?.isSuccess])

  return (
    <Box className='mt-4 w-11/12'>
      <form onSubmit={form.handleSubmit(editFreelancer)}>
        <Grid container>
          <Grid item xs={12}>
            <InputField
              name='biography'
              label='Bio'
              textarea
              textareaProps={{
                className: 'w-full mb-4',
                disabled: props.isInputsDisabled,
                placeholder: 'Escribe una introducción',
                rows: 3,
              }}
              options={{ required: 'Este campo es requerido' }}
              form={form}
            />
            <InputField
              name='college_degree'
              label='Especialidad'
              inputProps={{ className: 'w-full', disabled: props.isInputsDisabled, placeholder: 'Ingresa tu carrera' }}
              options={{ required: 'Este campo es requerido' }}
              form={form}
            />
          </Grid>

          <Grid item xs={4} className='flex mt-3 mr-6'>
            <p className='subtitle4-medium mt-4 mr-8'>Nivel</p>
            <div className='flex items-center'>
              <div className='mr-4'>
                <InputField
                  id='experience_level_j'
                  name='experience_level'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'junior',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='experience_level_j' className='body2-medium cursor-pointer block -mt-6'>
                  Junior
                </label>
              </div>
              <div className='mr-4'>
                <InputField
                  name='experience_level'
                  id='experience_level_m'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'semi_senior',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='experience_level_m' className='body2-medium cursor-pointer block -mt-6'>
                  Mid
                </label>
              </div>
              <div className='mr-4'>
                <InputField
                  name='experience_level'
                  id='experience_level_s'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'senior',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='experience_level_s' className='body2-medium cursor-pointer block -mt-6'>
                  Senior
                </label>
              </div>
              <div className='mr-4'>
                <InputField
                  name='experience_level'
                  id='experience_level_e'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'expert',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='experience_level_e' className='body2-medium cursor-pointer block -mt-6'>
                  Experto
                </label>
              </div>
            </div>
          </Grid>

          <Grid item xs={3} className='flex mt-3'>
            <p className='subtitle4-medium mt-4 mr-8'>Status</p>
            <div className='flex items-center'>
              <div className='mr-4'>
                <InputField
                  name='is_available_to_work'
                  id='is_available_to_work_on'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'true',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='is_available_to_work_on' className='body2-medium cursor-pointer block -mt-6'>
                  On
                </label>
              </div>
              <div className='mr-4'>
                <InputField
                  name='is_available_to_work'
                  id='is_available_to_work_off'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'false',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='is_available_to_work_off' className='body2-medium cursor-pointer block -mt-6'>
                  Off
                </label>
              </div>
            </div>
          </Grid>

          <Grid item xs={4} className='flex mt-3'>
            <p className='subtitle4-medium mt-4 mr-8'>¿Esconder?</p>
            <div className='flex items-center'>
              <div className='mr-4'>
                <InputField
                  name='is_hidden'
                  id='is_hidden_on'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'true',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='is_hidden_on' className='body2-medium cursor-pointer block -mt-6'>
                  Si
                </label>
              </div>
              <div className='mr-4'>
                <InputField
                  name='is_hidden'
                  id='is_hidden_off'
                  inputProps={{
                    className: 'no-height',
                    type: 'radio',
                    value: 'false',
                    disabled: props.isInputsDisabled,
                  }}
                  form={form}
                />
                <label htmlFor='is_hidden_off' className='body2-medium cursor-pointer block -mt-6'>
                  No
                </label>
              </div>
            </div>
          </Grid>
        </Grid>

        <Box className='flex justify-end mt-6'>
          <Button variant='contained' color='primary' type='submit' disabled={props.isInputsDisabled}>
            Guardar cambios
          </Button>
        </Box>
      </form>

      <Divider className='mt-4' />
    </Box>
  )
}

export default FreelancerAditionalInfo
