import { Link } from 'react-router-dom'
import { IProject } from '../../../models/IProject'
import routes from '../../../constants/routes'
import { useProjectsQuery } from '../../../customHooks/request/projectsQuery'
import usePagination from '../../../customHooks/usePagination'

import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import CustomPagination from '../../../assets/UIkit/CustomPagination'
import { useSetLoader } from '../../../customHooks/useSetLoader'

type TFreelancerProjectList = {
  freelancerId: string
}

const limit = 20

const FreelancerProjectList: React.FC<TFreelancerProjectList> = (props) => {
  const pagination = usePagination()
  const projectsQuery = useProjectsQuery({ freelancer: props.freelancerId, page: pagination.page, limit })
  useSetLoader(projectsQuery)

  return (
    <>
      {projectsQuery.isSuccess && projectsQuery.data.data.length > 0 && (
        <List className='mt-6 py-0'>
          {projectsQuery.data.data.map((project: IProject) => {
            return (
              <ListItem dense={true} button key={project._id}>
                <Link to={`${routes.cpanel.freelancers.findie}/${props.freelancerId}/proyectos/detalle-proyecto/${project._id}`}>
                  <span className='buttontext4-regular'>{project.title.slice(0, 50)}</span>
                </Link>
                <ListItemSecondaryAction></ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      )}

      {projectsQuery.isSuccess && (
        <CustomPagination
          pages={projectsQuery.data.metadata.pages}
          page={pagination.page}
          onChange={pagination.handlePage}
          position={'center'}
          className='mt-4'
        />
      )}
    </>
  )
}

export default FreelancerProjectList
