import { Route, Switch } from 'react-router-dom'
import routes from '../constants/routes'

import AdminProfile from '../views/Cpanel/AdminProfile'
import Assets from '../views/Cpanel/Assets'
import Freelancers from '../views/Cpanel/Freelancers'
import Clients from '../views/Cpanel/Clients'
import Projects from '../views/Cpanel/Projects'
import { UfContextProvider } from '../context/Cpanel/UfContext'
import Board from '../views/Cpanel/Board'

function CpanelRouter() {
  return (
    <UfContextProvider>
      <Switch>
        <Route path={routes.cpanel.profile} component={AdminProfile} />
        <Route path={routes.cpanel.freelancers.index} component={Freelancers} />
        <Route path={routes.cpanel.clients.index} component={Clients} />
        <Route path={routes.cpanel.assets.index} component={Assets} />
        <Route path={routes.cpanel.projects.list} component={Projects} />
        <Route path={routes.cpanel.board} component={Board} />
      </Switch>
    </UfContextProvider>
  )
}

export default CpanelRouter
