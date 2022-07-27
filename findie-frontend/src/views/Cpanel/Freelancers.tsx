import { Route, Switch } from 'react-router-dom'
import routes from '../../constants/routes'

import FreelancerRegister from '../../components/Cpanel/Freelancers/FreelancerRegister'
import FreelancersPostulations from '../../components/Cpanel/Freelancers/FreelancersPostulations'
import FreelancersFindie from '../../components/Cpanel/Freelancers/FreelancersFindie'
import FreelancersFindieFeatured from '../../components/Cpanel/Freelancers/FreelancersFindieFeatured'

const Freelancers: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.cpanel.freelancers.register} component={FreelancerRegister} />
      <Route path={routes.cpanel.freelancers.postulations} component={FreelancersPostulations} />
      <Route path={routes.cpanel.freelancers.findie} component={FreelancersFindie} />
      <Route path={routes.cpanel.freelancers.findie_featured} component={FreelancersFindieFeatured} />
    </Switch>
  )
}

export default Freelancers
