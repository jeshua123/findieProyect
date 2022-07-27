import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../../../constants/routes'

import { Box, Button, Divider } from '@material-ui/core'
import FreelancerProjectDetail from './FreelancerProjectDetail'
import FreelancerProjectList from './FreelancerProjectList'
import AppDialog from '../../../assets/UIkit/AppDialog'

type TFreelancerProjects = {
  freelancerId: string
}

const FreelancerProjects: React.FC<TFreelancerProjects> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <Switch>
        <Route path={`${routes.cpanel.freelancers.findie}/:id/proyectos/detalle-proyecto/:projectId`}>
          <FreelancerProjectDetail freelancerId={props.freelancerId} />
        </Route>
        <Route exact={true}>
          <FreelancerProjectList freelancerId={props.freelancerId} />
        </Route>
      </Switch>

      <AppDialog open={isDialogOpen} title='Descarga de contrato' handleClose={() => setIsDialogOpen(false)}>
        <span className='subtitle4-medium'>
          ¿Estás seguro que deseas descargar el contrato del proyecto "cpanel en phyton" del cliente Jose Perez?
        </span>
        <Divider />

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-4' onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary'>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </>
  )
}

export default FreelancerProjects
