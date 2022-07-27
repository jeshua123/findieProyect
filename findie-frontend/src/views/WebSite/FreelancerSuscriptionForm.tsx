import { useContext, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import useLocalStorage from '../../customHooks/useLocalStorage'
import routes from '../../constants/routes'
import { setFormTheme } from '../../utils/helpers'

import Wizard from '../../shared/Wizard/Wizard'
import FreelancerStepZero from '../../components/WebSite/FreelancerSuscriptionForm/FreelancerStepZero'
import FreelancerStepOne from '../../components/WebSite/FreelancerSuscriptionForm/FreelancerStepOne'
import FreelancerStepTwo from '../../components/WebSite/FreelancerSuscriptionForm/FreelancerStepTwo'
import FreelancerStepThree from '../../components/WebSite/FreelancerSuscriptionForm/FreelancerStepThree'
import FreelancerStepFour from '../../components/WebSite/FreelancerSuscriptionForm/FreelancerStepFour'
import FreelancerStepFive from '../../components/WebSite/FreelancerSuscriptionForm/FreelancerStepFive'
import { CategoriesContext } from '../../context/Cpanel/CategoriesContext'

const FreelancerSuscriptionForm: React.FC = () => {
  const history = useHistory()
  const { categoriesQuery } = useContext(CategoriesContext)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [freelancerName, setFreelancerName] = useState<string>('')
  const storage = useLocalStorage('freelancer', { createdAt: new Date().getTime() })

  const handleStep = (step: string) => {
    history.push(`${routes.web_site.freelancer_suscription_form.form_steps}/${step}`)
  }

  const defaultProps = {
    isButtonDisabled,
    route: routes.web_site.freelancer_suscription_form.form_steps,
    storage,
    setFreelancerName,
    setIsButtonDisabled,
    handleStep,
    setTheme: () => setFormTheme('orange'),
  }

  return (
    <Switch>
      <Route exact path={routes.web_site.freelancer_suscription_form.step_zero} component={FreelancerStepZero} />
      <Route exact path={routes.web_site.freelancer_suscription_form.step_five}>
        <FreelancerStepFive freelancerName={freelancerName} />
      </Route>
      <Route exact path={`${routes.web_site.freelancer_suscription_form.form_steps}/:slide`}>
        <Wizard {...defaultProps} withRoutes>
          <FreelancerStepOne {...defaultProps} />
          <FreelancerStepTwo {...defaultProps} />
          <FreelancerStepThree {...defaultProps} />
          <FreelancerStepFour {...defaultProps} />
        </Wizard>
      </Route>
    </Switch>
  )
}

export default FreelancerSuscriptionForm
