import { Link } from 'react-router-dom'
import routes from '../../constants/routes'
import { IProject, TProjectEvaluationStatus, TProjectStatus } from '../../models/IProject'
import usePagination from '../../customHooks/usePagination'
import { useSetLoader } from '../../customHooks/useSetLoader'
import { useProjectsQuery } from '../../customHooks/request/projectsQuery'

import { Box, Divider, Grid, List, ListItem } from '@material-ui/core'
import CustomPagination from '../../assets/UIkit/CustomPagination'
import FiButton from '../../assets/UIkit/FiButton'

type TProjectList = {
  clientId?: string
  asClient?: boolean
}

const progressStatus = [
  { title: 'open', color: 'bg-soft-green' },
  { title: 'searching', color: 'bg-blue' },
  { title: 'calculator', color: 'bg-orange' },
  { title: 'in progress', color: 'bg-red' },
  { title: 'completed', color: 'bg-strong-rose' },
  { title: 'cancelled', color: 'bg-black' },
]
const limit = 20

const ProjectList: React.FC<TProjectList> = (props) => {
  const pagination = usePagination()
  const projectsQuery = useProjectsQuery({ client: props.clientId, page: pagination.page, limit })
  useSetLoader(projectsQuery)

  const setEvaluationColor = (status: TProjectEvaluationStatus) => {
    if (['step_one', 'step_two'].includes(status)) return 'bg-soft-green'
    if (status === 'step_three') return 'bg-blue'
    if (['step_four', 'step_five'].includes(status)) return 'bg-orange'
    return ''
  }

  const setStatusColor = (status: TProjectStatus) => {
    if (status === 'in_progress') return 'bg-red'
    if (status === 'finished') return 'bg-strong-rose'
    if (status === 'cancelled') return 'bg-black'
    return ''
  }

  const setProjectPath = (projectId: string, clientId: string) => {
    if (props.asClient) return `${routes.cpanel.clients.findie}/${props.clientId}/proyectos/detalle/${projectId}/${clientId}`
    return `${routes.cpanel.projects.detail}/${projectId}/${clientId}`
  }

  return (
    <>
      <div className='flex justify-between items-center mt-4'>
        <div className='w-52'>
          {props.asClient && (
            <FiButton
              asLink
              variant='outlined'
              to={`${routes.cpanel.clients.findie}/${props.clientId}/proyectos/nuevo-proyecto`}
              className='mt-4'
            >
              Crear proyecto
            </FiButton>
          )}
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Box className='flex justify-end mt-4'>
              {progressStatus.map((item) => {
                return (
                  <p key={item.title} className='microcopy mt-1 flex items-center mr-4'>
                    <span className={`rounded-full h-4 w-4 inline-block mr-1 ${item.color}`} /> {item.title}
                  </p>
                )
              })}
            </Box>
          </Grid>
        </Grid>
      </div>

      {projectsQuery.isSuccess && projectsQuery.data.data.length > 0 && (
        <List className='mt-4 py-0'>
          {projectsQuery.data.data
            .filter((project: IProject) => ['not_approved', 'in_progress'].includes(project.project_status))
            .map((project: IProject) => {
              return (
                <ListItem dense button key={project._id} className='pl-0 mt-1'>
                  <Link className='w-full' to={setProjectPath(project._id, project.client._id)}>
                    <Box display='grid' gridTemplateColumns='25px 30% 1fr' className='gap-2'>
                      {['not_approved'].includes(project.project_status) && (
                        <p className={`${setEvaluationColor(project.evaluation_status)} self-center rounded-full h-4 w-4 mr-2`} />
                      )}
                      {['in_progress'].includes(project.project_status) && (
                        <p className={`${setStatusColor(project.project_status)} self-center rounded-full h-4 w-4 mr-2`} />
                      )}
                      <p className='buttontext4-regular self-center'>
                        {project.title ? project.title.slice(0, 50) : 'Titulo no asignado'}
                      </p>
                      {!props.asClient && <p className='buttontext4-regular self-center'>{project.client.companyName}</p>}
                    </Box>
                  </Link>
                </ListItem>
              )
            })}
        </List>
      )}

      <Divider className='mb-4 mt-20' />

      <p className='buttontext1-medium mb-4'>Históricos</p>
      {projectsQuery.isSuccess && projectsQuery.data.data.length > 0 && (
        <List className='mt-4 py-0'>
          {projectsQuery.data.data
            .filter((project: IProject) => ['finished', 'cancelled'].includes(project.project_status))
            .map((project: IProject) => {
              return (
                <ListItem dense button key={project._id} className='pl-0 mt-1'>
                  <Link className='w-full' to={setProjectPath(project._id, project.client._id)}>
                    <Box className='gap-2' display='grid' gridTemplateColumns='25px 30% 1fr'>
                      <span
                        className={`${setStatusColor(
                          project.project_status
                        )}  self-center rounded-full h-4 w-4 inline-block mr-2`}
                      />
                      <p className='buttontext4-regular self-center'>
                        {project.title ? project.title.slice(0, 50) : 'Titulo no asignado'}
                      </p>
                      {!props.asClient && <p className='buttontext4-regular self-center'>{project.client.companyName}</p>}
                    </Box>
                  </Link>
                </ListItem>
              )
            })}
        </List>
      )}

      {projectsQuery.isSuccess && (
        <div className='mt-6 flex justify-center'>
          <CustomPagination
            pages={projectsQuery.data.metadata.pages}
            page={pagination.page}
            onChange={pagination.handlePage}
            position={'center'}
          />
        </div>
      )}
    </>
  )
}

export default ProjectList
