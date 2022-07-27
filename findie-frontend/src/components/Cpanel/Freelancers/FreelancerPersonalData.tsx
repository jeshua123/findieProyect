import { SubmitHandler, useForm } from 'react-hook-form'
import FreelancersForm from '../../../shared/FreelancersForm/FreelancersForm'

import { Box, Button } from '@material-ui/core'
import { IFreelancer } from '../../../models/IFreelancer'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { loadFile } from '../../../utils/helpers'

type TFreelancerPersonalData = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  putFreelancerMutation: UseMutationResult<{ data: IFreelancer }, unknown, { body: Partial<IFreelancer>; _id: string }, unknown>
}

const FreelancerPersonalData: React.FC<TFreelancerPersonalData> = (props) => {
  const form = useForm()

  const editFreelancer: SubmitHandler<IFreelancer> = async (data) => {
    let cv = undefined
    let portfolio = undefined
    let avatar = undefined

    if (form?.watch('cv.url')?.item(0)?.name && !form?.watch('cv.url')?.item(0)?.name.includes('http')) {
      cv = { ...data.cv, url: await loadFile(data.cv.url) }
    }
    if (form?.watch('portfolio.url')?.item(0)?.name && !form?.watch('portfolio.url')?.item(0)?.name.includes('http')) {
      portfolio = { ...data.portfolio, url: await loadFile(data.portfolio.url) }
    }
    if (form.watch('avatar.url')?.item(0)?.name && !form.watch('avatar.url')?.item(0)?.name.includes('http')) {
      avatar = { ...data.avatar, url: await loadFile(data.avatar.url) }
    }
    const formatedData = {
      ...data,
      createdAt: new Date(data.createdAt).getTime(),
      birthdate: new Date(data.birthdate).getTime(),
      cv,
      portfolio,
      avatar,
    }
    props.putFreelancerMutation.mutate({ body: formatedData, _id: props.freelancerId })
  }

  return (
    <form onSubmit={form.handleSubmit(editFreelancer)}>
      <FreelancersForm form={form} freelancer={props.freelancer} isDisabledFields={props.isInputsDisabled} asFreelancerFindie />

      <Box display='flex' justifyContent='flex-end'>
        <Button variant='contained' color='primary' className='mt-3' type='submit' disabled={props.isInputsDisabled}>
          Guardar cambios
        </Button>
      </Box>
    </form>
  )
}

export default FreelancerPersonalData
