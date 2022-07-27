import { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router'
import useLocalStorage from '../../customHooks/useLocalStorage'
import routes from '../../constants/routes'
import { setFormTheme } from '../../utils/helpers'

import Wizard from '../../shared/Wizard/Wizard'
import ClientStepZero from '../../components/WebSite/ClientSuscriptionForm/ClientStepZero'
import ClientStepOne from '../../components/WebSite/ClientSuscriptionForm/ClientStepOne'
import ClientStepTwo from '../../components/WebSite/ClientSuscriptionForm/ClientStepTwo'
import ClientStepThree from '../../components/WebSite/ClientSuscriptionForm/ClientStepThree'
import ClientStepFour from '../../components/WebSite/ClientSuscriptionForm/ClientStepFour'
import ClientStepFive from '../../components/WebSite/ClientSuscriptionForm/ClientStepFive'
import ClientStepSix from '../../components/WebSite/ClientSuscriptionForm/ClientStepSix'
import ClientStepSeven from '../../components/WebSite/ClientSuscriptionForm/ClientStepSeven'
import ClientStepEight from '../../components/WebSite/ClientSuscriptionForm/ClientStepEight'

const ClienteSuscriptionForm: React.FC = () => {
  const param = useParams<{ freelancerId: string }>()
  const [freelancerId, setState] = useState(param.freelancerId)
  const history = useHistory()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const storage = useLocalStorage('project', { createdAt: new Date().getTime() })

  const handleStep = (step: string) => {
    history.push(`${routes.web_site.client_suscription_form.form_steps}/${step}`)
  }

  const defaultProps = {
    isButtonDisabled,
    route: routes.web_site.client_suscription_form.form_steps,
    storage,
    setIsButtonDisabled,
    handleStep,
    setTheme: setFormTheme,
  }

  useEffect(() => {
    history.push(`${routes.web_site.client_suscription_form.form_steps}/0`)
  }, [])

  return (
    <Switch>
      <Route exact path={`${routes.web_site.client_suscription_form.step_zero}`} component={ClientStepZero} />
      <Route exact path={routes.web_site.client_suscription_form.step_eight} component={ClientStepEight} />
      <Route exact path={`${routes.web_site.client_suscription_form.form_steps}/:slide`}>
        <Wizard {...defaultProps} withRoutes>
          <ClientStepOne {...defaultProps} />
          <ClientStepTwo {...defaultProps} />
          <ClientStepThree {...defaultProps} />
          <ClientStepFour {...defaultProps} />
          <ClientStepFive {...defaultProps} />
          <ClientStepSix {...defaultProps} title='Ya casi estamos, hablemos de presupuesto:' name='budget' currentStep='6' />
          <ClientStepSeven {...defaultProps} freelancerId={freelancerId} />
        </Wizard>
      </Route>
    </Switch>
  )
}

export default ClienteSuscriptionForm
