import { Link } from 'react-router-dom'
import usePagination from '../../../customHooks/usePagination'
import { IClient } from '../../../models/IClient'
import { useClientsQuery, usePutClientMutation } from '../../../customHooks/request/clientsQuery'
import routes from '../../../constants/routes'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { useQueryClient } from 'react-query'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import endpoints from '../../../constants/endpoints'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import useFilterByWord from '../../../customHooks/useFilterByWord'

import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, TextField } from '@material-ui/core'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'
import CustomPagination from '../../../assets/UIkit/CustomPagination'
import AppDialog from '../../../assets/UIkit/AppDialog'
import useGroupAlphabetList from '../../../customHooks/useGroupAlphabetList'

const limit = 20

const ClientsFindieList: React.FC = () => {
  const pagination = usePagination()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const queryClients = useQueryClient()
  const { word, renderInput } = useFilterByWord()
  const clientQuery = useClientsQuery({
    $and: [
      { $or: [{ client_status: 'available' }, { client_status: 'suspended' }] },
      {
        $or: [
          { name: word ? { $regex: word, $options: 'i' } : undefined },
          { lastName: word ? { $regex: word, $options: 'i' } : undefined },
        ],
      },
    ],
    page: pagination.page,
    limit,
  })
  const clients = useGroupAlphabetList<IClient>(clientQuery)
  const putClientMutation = usePutClientMutation('refresh')
  useRequestAlert(putClientMutation, undefined, afterMutation)
  useSetLoader(clientQuery)
  useSetLoader(queryClients)

  const openDialog = (freelancer: IClient) => {
    setRecuestAction('suspend')
    toogleDialog(freelancer)
  }

  const mutateClient = () => {
    const client_status = dialog.data.client_status === 'suspended' ? 'available' : 'suspended'
    putClientMutation.mutate({ body: { client_status }, _id: dialog.data._id })
  }

  async function afterMutation() {
    await queryClients.refetchQueries(`all_${endpoints.clients}`)
    toogleDialog()
  }

  return (
    <>
      <h3>Clientes Findie</h3>
      <Grid container className='mt-4'>
        <Grid item lg={8} md={10}>
          {renderInput()}
        </Grid>
      </Grid>

      {clients.map((structure) => {
        return (
          <div key={structure.letter}>
            {structure.list.length > 0 && (
              <>
                <p className='subtitle2-bold mt-4'>{structure.letter}</p>
                <List className='mt-2 border-t border-r border-l border-gray-300 py-0'>
                  {structure.list.map((client: IClient) => {
                    return (
                      <div key={client._id} className='border-b border-gray-300'>
                        <ListItem button>
                          <Link to={`${routes.cpanel.clients.findie}/${client._id}`}>
                            <Box className='flex items-center'>
                              <span className='buttontext4-regular'>
                                {client?.name}, {client?.lastName} - {client?.companyName}
                              </span>
                            </Box>
                          </Link>
                          <ListItemSecondaryAction>
                            <IconButton size='small' onClick={() => openDialog(client)}>
                              <FiIcons name='suspended' className={`${client.client_status === 'suspended' && 'svg-red'}`} />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </div>
                    )
                  })}
                </List>
              </>
            )}
          </div>
        )
      })}

      {clientQuery.isSuccess && (
        <CustomPagination
          pages={clientQuery.data.metadata.pages}
          page={pagination.page}
          onChange={pagination.handlePage}
          position={'center'}
          className='mt-4'
        />
      )}

      <AppDialog open={dialog.isOpen} title='Suspender Freelancer' handleClose={toogleDialog}>
        {recuestAction === 'suspend' && (
          <span className='subtitle4-medium'>
            {dialog?.data?.freelancer_status === 'suspended'
              ? `Estás seguro que deseas quitar el status de "suspendido(a) a ${dialog?.data?.name}`
              : `¿Estás seguro que deseas suspender a ${dialog?.data?.name}?. Si lo haces, el cliente no tendrá la posibilidad de
              acceder a la plataforma.`}
          </span>
        )}
        <Divider className='my-6' />

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-4' onClick={toogleDialog}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary' onClick={mutateClient}>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </>
  )
}

export default ClientsFindieList
