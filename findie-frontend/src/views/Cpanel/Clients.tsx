import { Route, Switch } from 'react-router-dom'
import routes from '../../constants/routes'

import ClientsRegister from '../../components/Cpanel/Clients/ClientsRegister'
import ClientsPostulations from '../../components/Cpanel/Clients/ClientsPostulations'
import ClientsFindie from '../../components/Cpanel/Clients/ClientsFindie'

const Clients: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.cpanel.clients.register} component={ClientsRegister} />
      <Route path={routes.cpanel.clients.postulations} component={ClientsPostulations} />
      <Route path={routes.cpanel.clients.findie} component={ClientsFindie} />
    </Switch>
  )
}

export default Clients
