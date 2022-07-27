import { useForm, SubmitHandler } from 'react-hook-form'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { usePostClientMutation } from '../../../customHooks/request/clientsQuery'
import { IClient } from '../../../models/IClient'

import ClientsForm from '../../../shared/ClientsForm/ClientsForm'

import { Box, Button } from '@material-ui/core'

const ClientsRegister: React.FC = () => {
  const form = useForm()
  const postClientMutation = usePostClientMutation()
  useRequestAlert(postClientMutation, form)

  const createClient: SubmitHandler<IClient> = (data) => {
    const formatedData = {
      ...data,
      createdAt: new Date(data.createdAt).getTime(),
    }
    postClientMutation.mutate(formatedData)
  }

  return (
    <>
      <h3>Registrar nuevo Cliente</h3>
      <form onSubmit={form.handleSubmit(createClient)}>
        <ClientsForm form={form} />

        <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
          <Button type='submit' variant='contained' color='primary' className='mt-3'>
            Registrar
          </Button>
        </Box>
      </form>
    </>
  )
}

export default ClientsRegister
