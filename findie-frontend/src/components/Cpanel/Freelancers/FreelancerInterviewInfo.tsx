import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IFreelancer } from '../../../models/IFreelancer'

import { Box, Button } from '@material-ui/core'
import InputField from '../../../assets/UIkit/Forms/InputField'

type TFreelancerInterviewInfo = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  putFreelancerMutation: UseMutationResult<{ data: IFreelancer }, unknown, { body: Partial<IFreelancer>; _id: string }, unknown>
  afterFreelancerMutation: () => void
}

const FreelancerInterviewInfo: React.FC<TFreelancerInterviewInfo> = (props) => {
  const form = useForm()

  const submit = (body: IFreelancer) => {
    props.putFreelancerMutation.mutate({ body, _id: props.freelancerId })
  }

  useEffect(() => {
    if (props.freelancer.isSuccess) {
      form.setValue('interview_info', props.freelancer.data.interview_info)
    }
  }, [props.freelancer.isSuccess])

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <InputField
        label='Informacion adicional de la entrevista'
        name='interview_info'
        className='mt-8'
        textarea
        textareaProps={{
          placeholder: 'Agrega información adicional de interes',
          className: 'w-full',
          rows: 25,
          disabled: props.isInputsDisabled,
        }}
        form={form}
      />

      <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
        <Button variant='contained' color='primary' type='submit' disabled={props.isInputsDisabled}>
          Guardar cambios
        </Button>
      </Box>
    </form>
  )
}

export default FreelancerInterviewInfo
