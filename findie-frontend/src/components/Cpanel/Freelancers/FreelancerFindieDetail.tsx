import { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router-dom'
import routes from '../../../constants/routes'
import { useFreelancerQuery, usePutFreelancerMutation } from '../../../customHooks/request/freelancersQuery'
import { useQueryClient } from 'react-query'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { useSetLoader } from '../../../customHooks/useSetLoader'

import FreelancerBilling from './FreelancerBilling'
import FreelancerComments from './FreelancerComments'
import FreelancerPersonalData from './FreelancerPersonalData'
import FreelancerProjects from './FreelancerProjects'
import FreelancerTickets from './FreelancerTickets'
import FreelancerShortCuts from '../../../shared/FreelancerShortCuts/FreelancerShortCuts'
import FreelancerPaymentRecord from './FreelancerPaymentRecord'
import FreelancerCpanelprofile from './FreelancerCpanelprofile'
import InterviewInfo from './FreelancerInterviewInfo'

import { Box } from '@material-ui/core'
import Tabs from '../../../assets/UIkit/Tabs'
import useSwitchOnOff from '../../../customHooks/useSwitchOnOff'

const FreelancerFindieDetail: React.FC = () => {
  const history = useHistory()
  const params = useParams<{ _id: string }>()
  const freelancerQuery = useFreelancerQuery(params._id)
  const switchOnOff = useSwitchOnOff()
  const queryClient = useQueryClient()
  const putFreelancerMutation = usePutFreelancerMutation()
  useRequestAlert(putFreelancerMutation, undefined, afterFreelancerMutation)
  useSetLoader(freelancerQuery)
  useSetLoader(queryClient)

  const tabs = [
    {
      id: 1,
      text: `Datos Personales`,
      isSelected: true,
      action: () => tabAction('datos-personales'),
    },
    {
      id: 2,
      text: `Facturación`,
      isSelected: false,
      action: () => tabAction('facturacion'),
    },
    {
      id: 5,
      text: `Ticket`,
      isSelected: false,
      action: () => tabAction('tickets'),
    },
    {
      id: 7,
      text: `Perfil`,
      isSelected: false,
      action: () => tabAction('mas-informacion'),
    },
    {
      id: 8,
      text: `Entrevista`,
      isSelected: false,
      action: () => tabAction('info-entrevista'),
    },
  ]
  const tabAction = (path: string) => {
    history.push(`${routes.cpanel.freelancers.findie}/${params._id}/${path}`)
    switchOnOff.setSwitchState(false)
  }

  function afterFreelancerMutation() {
    freelancerQuery.refetch()
  }

  // useEffect(() => {
  //   history.push(`${routes.cpanel.freelancers.findie}/${params._id}/datos-personales`)
  // }, [])

  const componentsProps = {
    freelancerId: params._id,
    freelancer: freelancerQuery,
    isInputsDisabled: !switchOnOff.switchState,
    putFreelancerMutation: putFreelancerMutation,
    afterFreelancerMutation: afterFreelancerMutation,
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <h3>
          {freelancerQuery?.data?.name} {freelancerQuery?.data?.lastName}
        </h3>

        {freelancerQuery.isSuccess && (
          <FreelancerShortCuts freelancer={freelancerQuery.data} freelancersQuery={freelancerQuery} freelancerDetail />
        )}
      </Box>

      <Box className='flex flex justify-between mt-4'>
        <Tabs tabs={tabs} />
        {switchOnOff.render()}
      </Box>

      <Switch>
        <Route path={`${routes.cpanel.freelancers.findie}/:id/facturacion`}>
          <FreelancerBilling {...componentsProps} />
        </Route>
        {/* <Route path={`${routes.cpanel.freelancers.findie}/:id/proyectos`}>
          <FreelancerProjects {...componentsProps} />
        </Route> */}
        {/* <Route path={`${routes.cpanel.freelancers.findie}/:id/comentarios`} component={FreelancerComments} /> */}
        <Route path={`${routes.cpanel.freelancers.findie}/:id/tickets`}>
          <FreelancerTickets {...componentsProps} />
        </Route>
        {/* <Route path={`${routes.cpanel.freelancers.findie}/:id/historial-pagos`}>
          <FreelancerPaymentRecord rolId={params._id} />
        </Route> */}
        <Route path={`${routes.cpanel.freelancers.findie}/:id/mas-informacion`}>
          <FreelancerCpanelprofile {...componentsProps} />
        </Route>
        <Route path={`${routes.cpanel.freelancers.findie}/:id/info-entrevista`}>
          <InterviewInfo {...componentsProps} />
        </Route>
        <Route exact={true}>
          <FreelancerPersonalData {...componentsProps} />
        </Route>
      </Switch>
    </>
  )
}

export default FreelancerFindieDetail
