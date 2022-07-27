import { SubmitHandler, useForm } from 'react-hook-form'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IClient } from '../../../models/IClient'

import ClientsForm from '../../../shared/ClientsForm/ClientsForm'

import { Box, Button } from '@material-ui/core'

type TClientPersonalData = {
  clientId: string
  client: UseQueryResult<IClient, unknown>
  isInputsDisabled: boolean
  putClientMutation: UseMutationResult<{ data: IClient }, unknown, { body: Partial<IClient>; _id: string }, unknown>
}

const ClientPersonalData: React.FC<TClientPersonalData> = (props) => {
  const form = useForm()

  const editClient: SubmitHandler<IClient> = (data) => {
    const formatedData = {
      ...data,
      createdAt: new Date(data.createdAt).getTime(),
    }
    props.putClientMutation.mutate({ body: formatedData, _id: props.clientId })
  }

  return (
    <form onSubmit={form.handleSubmit(editClient)}>
      <ClientsForm form={form} client={props.client} isDisabledFields={props.isInputsDisabled} />

      <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
        <Button variant='contained' color='primary' className='mt-3' type='submit' disabled={props.isInputsDisabled}>
          Guardar cambios
        </Button>
      </Box>
    </form>
  )
}

export default ClientPersonalData
