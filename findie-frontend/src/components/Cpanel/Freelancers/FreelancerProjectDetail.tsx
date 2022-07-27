import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import routes from '../../../constants/routes'
import { useProjectQuery } from '../../../customHooks/request/projectsQuery'

import { Box, Button, Grid } from '@material-ui/core'

type TFreelancerProjectDetail = {
  freelancerId: string
}

const FreelancerProjectDetail: React.FC<TFreelancerProjectDetail> = (props) => {
  const params = useParams<{ projectId: string }>()
  const projectQuery = useProjectQuery(params.projectId)

  const traslateState = () => {
    const states = {
      not_approved: 'Por aprobar',
      in_progress: 'En proceso',
      finished: 'Terminado',
      cancelled: 'Cancelado',
    }
    return projectQuery?.data?.project_status && states[projectQuery?.data?.project_status]
  }

  return (
    <>
      <Link
        to={`${routes.cpanel.freelancers.findie}/${props.freelancerId}/proyectos`}
        className='body1-medium flex items-center cursor-pointer mt-4'
      >
        Volver
      </Link>
      <Box className='border border-black mt-4 w-10/12'>
        <Grid container className='border-b border-black'>
          <Grid item xs={2} className='p-2'>
            <span className='button-text2-bold'>Titulo</span>
          </Grid>
          <Grid item xs={8} className='border-l border-black p-2'>
            <span className='subtitle3-regular'>{projectQuery?.data?.title}</span>
          </Grid>
        </Grid>

        <Grid container className='border-b border-black'>
          <Grid item xs={2} className='p-2'>
            <span className='button-text2-bold'>Cliente</span>
          </Grid>
          <Grid item xs={8} className='border-l border-black p-2'>
            <span className='subtitle3-regular'>
              {projectQuery?.data?.client?.name} - {projectQuery?.data?.client?.companyName}
            </span>
          </Grid>
        </Grid>

        <Grid container className='border-b border-black'>
          <Grid item xs={2} className='p-2'>
            <span className='button-text2-bold'>Brief</span>
          </Grid>
          <Grid item xs={8} className='border-l border-black p-2'>
            <span className='subtitle3-regular'>{projectQuery?.data?.brief}</span>
          </Grid>
        </Grid>

        <Grid container className='border-b border-black'>
          <Grid item xs={2} className='p-2'>
            <span className='button-text2-bold'>Valor</span>
          </Grid>
          <Grid item xs={8} className='border-l border-black p-2'>
            <span className='subtitle3-regular'>{projectQuery?.data?.price.total}</span>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} className='p-2'>
            <span className='button-text2-bold'>Estado</span>
          </Grid>
          <Grid item xs={8} className='border-l border-black p-2'>
            <span className='subtitle3-regular'>{traslateState()}</span>
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
        <Button variant='contained' color='primary' type='submit'>
          descargar contrato
        </Button>
      </Box>
    </>
  )
}

export default FreelancerProjectDetail
