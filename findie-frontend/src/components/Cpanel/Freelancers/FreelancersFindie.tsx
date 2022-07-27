import { Route, Switch } from 'react-router-dom'
import routes from '../../../constants/routes'
import FreelancerFindieDetail from './FreelancerFindieDetail'
import FreelancersFindieList from './FreelancersFindieList'

const FreelancersFindie: React.FC = () => {
  return (
    <Switch>
      <Route path={`${routes.cpanel.freelancers.findie}/:_id`} component={FreelancerFindieDetail} />
      <Route exact={true} component={FreelancersFindieList} />
    </Switch>
  )
}

export default FreelancersFindie
