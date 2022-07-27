import { useForm, SubmitHandler } from 'react-hook-form'
import { IFreelancer } from '../../../models/IFreelancer'
import { usePostFreelancerMutation } from '../../../customHooks/request/freelancersQuery'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { loadFile } from '../../../utils/helpers'

import FreelancersForm from '../../../shared/FreelancersForm/FreelancersForm'

import { Box, Button } from '@material-ui/core'

const FreelancerRegister: React.FC = () => {
  const form = useForm()
  const postFreelancerMutation = usePostFreelancerMutation()
  useRequestAlert(postFreelancerMutation, form)

  const createFreelancer: SubmitHandler<IFreelancer> = async (data) => {
    let cv = undefined
    let portfolio = undefined
    let avatar = undefined

    if (form.watch('cv.url')?.item(0)?.name && !form.watch('cv.url')?.item(0)?.name.includes('http')) {
      cv = { ...data.cv, url: await loadFile(data.cv.url) }
    }
    if (form.watch('portfolio.url')?.item(0)?.name && !form.watch('portfolio.url')?.item(0)?.name.includes('http')) {
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
    postFreelancerMutation.mutate(formatedData)
  }

  return (
    <>
      <h3>Registrar nuevo Freelancer</h3>
      <form onSubmit={form.handleSubmit(createFreelancer)}>
        <FreelancersForm form={form} />

        <Box display='flex' justifyContent='flex-end'>
          <Button type='submit' variant='contained' color='primary' className='mt-3'>
            Registrar
          </Button>
        </Box>
      </form>
    </>
  )
}

export default FreelancerRegister
