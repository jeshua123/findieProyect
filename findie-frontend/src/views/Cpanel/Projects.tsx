import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import AllProjectDetail from '../../components/Cpanel/Projects/AllProjectDetail'
import AllProjectList from '../../components/Cpanel/Projects/AllProjectList'
import ProjectSimulator from '../../components/Cpanel/Projects/ProjectSimulator'
import routes from '../../constants/routes'

const Projects: FC = () => {
  return (
    <>
      <Switch>
        <Route path={`${routes.cpanel.projects.detail}/:projectId/:clientId`} component={AllProjectDetail} />
        <Route path={`${routes.cpanel.projects.simulator}`} component={ProjectSimulator} />
        <Route path={`${routes.cpanel.projects.list}`} component={AllProjectList} />
      </Switch>
    </>
  )
}

export default Projects
