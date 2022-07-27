import { Route, Switch } from 'react-router-dom'
import { useContext } from 'react'
import { LoaderContext } from '../context/LoaderContext'
import { CategoriesContextProvider } from '../context/Cpanel/CategoriesContext'
import routes from '../constants/routes'

import CpanelLayout from '../layout/Cpanel/CpanelLayout'
import ClienteSuscriptionForm from '../views/WebSite/ClientSuscriptionForm'
import FreelancerSuscriptionForm from '../views/WebSite/FreelancerSuscriptionForm'
import WebSiteLayout from '../layout/WebSite/WebSiteLayout'
import UiKitView from '../views/UiKitView'

import Loader from '../assets/UIkit/Loader'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute'

function AppRouter() {
  const loader = useContext(LoaderContext)

  return (
    <>
      <Loader open={loader.isOpen} />
      <CategoriesContextProvider>
        <Switch>
          <Route exact path={routes.auth.login} component={Login} />
          <Route exact path={routes.uikit} component={UiKitView} />
          <Route path={routes.web_site.freelancer_suscription_form.index} component={FreelancerSuscriptionForm} />
          <Route path={`${routes.web_site.client_suscription_form.index}/:freelancerId?`} component={ClienteSuscriptionForm} />
          <PrivateRoute
            userType={['admin', 'super_admin']}
            exact={false}
            path={routes.cpanel.index}
            component={<CpanelLayout />}
          />
          <Route path={routes.web_site.home} component={WebSiteLayout} />
        </Switch>
      </CategoriesContextProvider>
    </>
  )
}

export default AppRouter
