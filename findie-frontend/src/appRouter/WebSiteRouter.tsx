import { Route, Switch } from 'react-router-dom'
import routes from '../constants/routes'

import HomePage from '../views/WebSite/HomePage'
import AboutUs from '../views/WebSite/AboutUs'
import HowWorks from '../views/WebSite/HowWorks'
import OurFreelancers from '../views/WebSite/OurFreelancers'
import OurClients from '../views/WebSite/OurClients'
import Faqs from '../views/WebSite/Faqs'
import LegalAspects from '../views/WebSite/LegalAspects'
import FreelancersProfiles from '../views/WebSite/FreelancersProfiles'
import FreelancerProfile from '../views/WebSite/FreelancerProfile'
import Error404 from '../pages/error404'

function WebSiteRouter() {
  return (
    <Switch>
      <Route exact path={routes.web_site.terms_conditions} component={LegalAspects} />
      <Route exact path={routes.web_site.faqs} component={Faqs} />
      <Route exact path={`${routes.web_site.freelancer_profile}/:id`} component={FreelancerProfile} />
      <Route exact path={`${routes.web_site.freelancers_profiles}/:categoryId`} component={FreelancersProfiles} />
      <Route exact path={routes.web_site.our_clients} component={OurClients} />
      <Route exact path={routes.web_site.our_freelancers} component={OurFreelancers} />
      <Route exact path={routes.web_site.how_works} component={HowWorks} />
      <Route exact path={routes.web_site.about_us} component={AboutUs} />
      <Route exact path={routes.web_site.home} component={HomePage} />
      <Route path={routes.page_not_fount} component={Error404} />
    </Switch>
  )
}

export default WebSiteRouter
