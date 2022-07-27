import { Link } from 'react-router-dom'
import routes from '../../../constants/routes'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import usePagination from '../../../customHooks/usePagination'
import { useFreelancersQuery } from '../../../customHooks/request/freelancersQuery'
import { IFreelancer } from '../../../models/IFreelancer'
import CustomPagination from '../../../assets/UIkit/CustomPagination'
import useFilterByWord from '../../../customHooks/useFilterByWord'

import { Box, Grid, List, ListItem } from '@material-ui/core'
import useGroupAlphabetList from '../../../customHooks/useGroupAlphabetList'

const limit = 20

const FreelancersPostulationList: React.FC = () => {
  const pagination = usePagination()
  const { word, renderInput } = useFilterByWord()
  const freelancersQuery = useFreelancersQuery({
    $or: [
      { name: word ? { $regex: word, $options: 'i' } : undefined },
      { lastName: word ? { $regex: word, $options: 'i' } : undefined },
    ],
    freelancer_status: 'not_available',
    page: pagination.page,
    limit,
  })
  const freelancers = useGroupAlphabetList<IFreelancer>(freelancersQuery)
  useSetLoader(freelancersQuery)

  return (
    <>
      <h3>Formularios Recibidos</h3>

      <Grid container className='mt-4'>
        <Grid item xs={8}>
          <Box>
            {renderInput()}
            {freelancersQuery.isSuccess && freelancersQuery.data.data.length === 0 && word && (
              <span className='subtitle3-regular text-red block'>No se encontraron resultados de la búsqueda</span>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className='flex justify-end items-center mt-4'>
            <p className='microcopy mr-8 flex items-center'>
              <span className='rounded-full h-4 w-4 bg-black-008 inline-block mr-1' /> : Formulario recibido
            </p>
            <p className='microcopy mr-8 flex items-center'>
              <span className='rounded-full h-4 w-4 bg-strong-rose inline-block mr-1' /> : Entrevista y Test
            </p>
            <p className='microcopy mr-8 flex items-center'>
              <span className='rounded-full h-4 w-4 bg-soft-green inline-block mr-1' /> : Registrar
            </p>
          </Box>
        </Grid>
      </Grid>

      {freelancers.map((structure) => {
        return (
          <div key={structure.letter}>
            {structure.list.length > 0 && (
              <>
                <p className='subtitle2-bold mt-4'>{structure.letter}</p>
                <List className='mt-2 border-t border-r border-l border-gray-300 py-0'>
                  {structure.list.map((freelancer: IFreelancer) => {
                    const statusColor: { [key: string]: string } = {
                      step_one: 'bg-black-008',
                      step_two: 'bg-strong-rose',
                      step_three: 'bg-soft-green',
                    }

                    return (
                      <div key={freelancer._id} className='border-b border-gray-300'>
                        <Link to={`${routes.cpanel.freelancers.postulations}/${freelancer._id}`}>
                          <ListItem button>
                            <Box className='flex items-center'>
                              <Box
                                className={`${statusColor[freelancer.postulation_status]} rounded-full h-4 w-4 inline-block mr-2`}
                              />
                              <span className='buttontext4-regular'>
                                {freelancer?.name}, {freelancer?.lastName} - {freelancer?.category?.name}
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

      {freelancersQuery.isSuccess && (
        <CustomPagination
          pages={freelancersQuery.data.metadata.pages}
          page={pagination.page}
          onChange={pagination.handlePage}
          position={'center'}
          className='mt-4'
        />
      )}
    </>
  )
}

export default FreelancersPostulationList
