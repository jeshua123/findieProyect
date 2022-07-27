import { Switch, Route } from 'react-router-dom'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { IClient } from '../../../models/IClient'
import routes from '../../../constants/routes'
import { IFreelancer } from '../../../models/IFreelancer'
import { IMetadata } from '../../../models/IMetadata'

import ClientNewProject from './ClientNewProject'
import Project from '../../../shared/Project/Project'
import ProjectList from '../../../shared/Project/ProjectList'

type TClientProjects = {
  clientId: string
  client: UseQueryResult<IClient, unknown>
  freelancersQuery: UseQueryResult<{ data: IFreelancer[]; metadata: IMetadata }>
  isInputsDisabled: boolean
  putClientMutation: UseMutationResult<{ data: IClient }, unknown, { body: Partial<IClient>; _id: string }, unknown>
}

const ClientProjects: React.FC<TClientProjects> = (props) => {
  const defalutProps = {
    clientId: props.clientId,
    isDisabledFields: props.isInputsDisabled,
    freelancersQuery: props.freelancersQuery,
  }

  return (
    <Switch>
      <Route path={`${routes.cpanel.clients.findie}/:id${routes.cpanel.project.new}`}>
        <ClientNewProject {...defalutProps} />
      </Route>
      <Route path={`${routes.cpanel.clients.findie}/:id${routes.cpanel.project.detail}/:projectId/:clientId`}>
        <Project {...defalutProps} />
      </Route>
      <Route exact={true}>
        <ProjectList clientId={props.clientId} asClient />
      </Route>
    </Switch>
  )
}

export default ClientProjects
