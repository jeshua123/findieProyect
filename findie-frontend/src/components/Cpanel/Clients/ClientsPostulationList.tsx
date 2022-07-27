import { Link } from 'react-router-dom'
import { useClientsQuery } from '../../../customHooks/request/clientsQuery'
import { IClient } from '../../../models/IClient'
import usePagination from '../../../customHooks/usePagination'
import routes from '../../../constants/routes'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import useFilterByWord from '../../../customHooks/useFilterByWord'

import { Box, Grid, IconButton, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import CustomPagination from '../../../assets/UIkit/CustomPagination'
import AddIcon from '@material-ui/icons/Add'
import useGroupAlphabetList from '../../../customHooks/useGroupAlphabetList'

const limit = 20

const ClientsPostulationList: React.FC = () => {
  const pagination = usePagination()
  const { word, renderInput } = useFilterByWord()
  const clientsQuery = useClientsQuery({
    $or: [
      { name: word ? { $regex: word, $options: 'i' } : undefined },
      { lastName: word ? { $regex: word, $options: 'i' } : undefined },
    ],
    client_status: 'not_available',
    page: pagination.page,
    limit,
  })
  const clients = useGroupAlphabetList<IClient>(clientsQuery)

  useSetLoader(clientsQuery)

  return (
    <>
      <h3>Clientes a postular</h3>
      <Grid container className='mt-4'>
        <Grid item lg={8} md={8}>
          {renderInput()}
          {clientsQuery.isSuccess && clientsQuery.data.data.length === 0 && word && (
            <span className='subtitle3-regular text-red block'>No se encontraron resultados de la búsqueda</span>
          )}
        </Grid>
        <Grid item lg={4} md={4} className='flex justify-end items-end'></Grid>
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
                        <Link to={`${routes.cpanel.clients.postulations}/${client._id}`}>
                          <ListItem button>
                            <Box className='flex items-center'>
                              <span className='buttontext4-regular'>
                                {client?.name}, {client?.lastName} - {client?.companyName}
                              </span>
                            </Box>
                          </ListItem>
                        </Link>
                      </div>
                    )
                  })}
                </List>
              </>
            )}
          </div>
        )
      })}

      {clientsQuery.isSuccess && (
        <CustomPagination
          pages={clientsQuery.data.metadata.pages}
          page={pagination.page}
          onChange={pagination.handlePage}
          position={'center'}
          className='mt-4'
        />
      )}
    </>
  )
}

export default ClientsPostulationList
