import { ReactElement } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../constants/routes'
import useAuth from '../customHooks/useAuth'

type TPrivateRoute = {
  exact: boolean
  path: string
  userType?: string[]
  component: ReactElement<any, string | React.JSXElementConstructor<any>>
}

const PrivateRoute: React.FC<TPrivateRoute> = (props) => {
  const location = useLocation()
  const auth = useAuth()

  if (!auth.isUserAllowed(props?.userType)) return <Redirect to={{ pathname: routes.auth.login, state: { from: location } }} />

  return (
    <Route exact={props.exact} path={props.path}>
      {props.component}
    </Route>
  )
}

export default PrivateRoute
