import { Route, Switch } from 'react-router-dom'
import routes from '../../../constants/routes'

import FreelancerEvaluation from './FreelancerEvaluation'
import FreelancersPostulationList from './FreelancersPostulationList'

const FreelancersPostulations: React.FC = () => {
  return (
    <Switch>
      <Route path={`${routes.cpanel.freelancers.postulations}/:_id`} component={FreelancerEvaluation} />
      <Route exact={true} component={FreelancersPostulationList} />
    </Switch>
  )
}

export default FreelancersPostulations
