import { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import routes from '../../constants/routes'

import Categories from '../../components/Cpanel/Assets/Categories'
import Tabs from '../../assets/UIkit/Tabs'
import Plans from '../../components/Cpanel/Assets/Plans'
import Skills from '../../components/Cpanel/Assets/Skills'
import PaymentMethods from '../../components/Cpanel/Assets/PaymentMethods'

const Assets: React.FC = () => {
  const history = useHistory()
  const tabs = [
    {
      id: 1,
      text: `Categorías`,
      isSelected: true,
      action: () => history.push(routes.cpanel.assets.categories),
    },
    {
      id: 2,
      text: `Habilidades`,
      action: () => history.push(routes.cpanel.assets.skills),
    },
    {
      id: 3,
      text: `Planes`,
      action: () => history.push(routes.cpanel.assets.plans),
    },
    {
      id: 4,
      text: `Metodos de pago`,
      action: () => history.push(routes.cpanel.assets.payment_methods),
    },
  ]

  useEffect(() => {
    //history.push(routes.cpanel.assets.categories)
  }, [])

  return (
    <>
      <Tabs tabs={tabs} />

      <Switch>
        <Route path={routes.cpanel.assets.skills}>
          <Skills />
        </Route>
        <Route path={routes.cpanel.assets.plans}>
          <Plans />
        </Route>
        <Route path={routes.cpanel.assets.payment_methods}>
          <PaymentMethods />
        </Route>
        <Route exact={true}>
          <Categories />
        </Route>
      </Switch>
    </>
  )
}

export default Assets
