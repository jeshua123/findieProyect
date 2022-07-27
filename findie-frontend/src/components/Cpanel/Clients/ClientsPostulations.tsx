import { Route, Switch } from 'react-router-dom'
import routes from '../../../constants/routes'

import ClientsPostulationList from './ClientsPostulationList'
import ClientEvaluation from './ClientEvaluation'

const ClientsPostulations: React.FC = () => {
  return (
    <Switch>
      <Route path={`${routes.cpanel.clients.postulations}/:_id`} component={ClientEvaluation} />
      <Route exact={true} component={ClientsPostulationList} />
    </Switch>
  )
}

export default ClientsPostulations
