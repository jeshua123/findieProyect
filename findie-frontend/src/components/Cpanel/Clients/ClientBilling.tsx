import { useForm } from 'react-hook-form'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IClient } from '../../../models/IClient'

import BankDataForm from '../../../shared/BankDataForm/BankDataForm'

import { Box, Button } from '@material-ui/core'

type TClientBilling = {
  clientId: string
  client: UseQueryResult<IClient, unknown>
  isInputsDisabled: boolean
  putClientMutation: UseMutationResult<{ data: IClient }, unknown, { body: Partial<IClient>; _id: string }, unknown>
}

const ClientBilling: React.FC<TClientBilling> = (props) => {
  const form = useForm()

  const editBankData = (data: IClient) => {
    props.putClientMutation.mutate({ body: data, _id: props.clientId })
  }

  return (
    <form onSubmit={form.handleSubmit(editBankData)}>
      <BankDataForm form={form} role={props.client} isDisabledFields={props.isInputsDisabled} />

      <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
        <Button variant='contained' color='primary' type='submit' disabled={props.isInputsDisabled}>
          Guardar cambios
        </Button>
      </Box>
    </form>
  )
}

export default ClientBilling
