import { useState, useEffect } from 'react'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IFreelancer } from '../../../models/IFreelancer'

import { Box, Button, Divider } from '@material-ui/core'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import AppDialog from '../../../assets/UIkit/AppDialog'

const limitTickets = 10

type TFreelancerTickets = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  putFreelancerMutation: UseMutationResult<{ data: IFreelancer }, unknown, { body: Partial<IFreelancer>; _id: string }, unknown>
}

const FreelancerTickets: React.FC<TFreelancerTickets> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const addTicket = () => {
    if (props.freelancer?.data?.simple_tickets.length === limitTickets) {
      return setErrorMessage('Llegaste al limite de tickets poisble')
    }
    setErrorMessage('')
    const newTicket = props.freelancer?.data?.simple_tickets && props.freelancer.data.simple_tickets.length + 1
    if (newTicket) {
      let ticketstArray: number[] = []
      for (let index = 1; index <= newTicket; index++) {
        ticketstArray = [...ticketstArray, index]
      }
      const body = { simple_tickets: ticketstArray }
      props.putFreelancerMutation.mutate({ body, _id: props.freelancerId })
    }
  }

  useEffect(() => {
    if (props.putFreelancerMutation.isSuccess) {
      setIsDialogOpen(false)
    }
  }, [props.putFreelancerMutation.isSuccess])

  return (
    <>
      <div className='flex mt-8'>
        <span className='body1-medium block mr-1'>Tickets:</span>
        <div className='flex'>
          {props.freelancer?.isSuccess &&
            props.freelancer?.data?.simple_tickets.map((ticket: number) => (
              <CardGiftcardIcon key={ticket} fontSize='large' className='text-soft-green' />
            ))}
        </div>
      </div>
      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Button variant='contained' color='primary' onClick={() => setIsDialogOpen(true)}>
          Agregar ticket
        </Button>
      </Box>

      <AppDialog open={isDialogOpen} title='Agregar ticket' handleClose={() => setIsDialogOpen(false)}>
        {errorMessage ? (
          <span className='subtitle4-medium mb-4 block'>{errorMessage}</span>
        ) : (
          <span className='subtitle4-medium mb-4 block'>
            ¿Estás seguro que deseas agregar un nuevo ticket a {props?.freelancer?.data?.name}?
          </span>
        )}

        <Divider className='mt-4' />
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-4' onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary' onClick={addTicket}>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </>
  )
}

export default FreelancerTickets
