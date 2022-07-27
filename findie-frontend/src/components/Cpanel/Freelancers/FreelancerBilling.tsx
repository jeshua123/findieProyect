import { useForm } from 'react-hook-form'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IFreelancer } from '../../../models/IFreelancer'

import BankDataForm from '../../../shared/BankDataForm/BankDataForm'

import { Box, Button } from '@material-ui/core'

type TFreelancerBilling = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  putFreelancerMutation: UseMutationResult<{ data: IFreelancer }, unknown, { body: Partial<IFreelancer>; _id: string }, unknown>
}

const FreelancerBilling: React.FC<TFreelancerBilling> = (props) => {
  const form = useForm()

  const editBankData = (data: IFreelancer) => {
    props.putFreelancerMutation.mutate({ body: data, _id: props.freelancerId })
  }

  return (
    <form onSubmit={form.handleSubmit(editBankData)}>
      <BankDataForm form={form} role={props.freelancer} isDisabledFields={props.isInputsDisabled} />

      <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
        <Button variant='contained' color='primary' type='submit' disabled={props.isInputsDisabled}>
          Guardar cambios
        </Button>
      </Box>
    </form>
  )
}

export default FreelancerBilling
