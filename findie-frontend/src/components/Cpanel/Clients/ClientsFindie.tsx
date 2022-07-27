import { Route, Switch } from 'react-router-dom'
import routes from '../../../constants/routes'

import ClientsFindieList from './ClientsFindieList'
import ClientFindieDetail from './ClientFindieDetail'

const ClientsFindie: React.FC = () => {
  return (
    <Switch>
      <Route path={`${routes.cpanel.clients.findie}/:_id`} component={ClientFindieDetail} />
      <Route exact={true} component={ClientsFindieList} />
    </Switch>
  )
}

export default ClientsFindie
