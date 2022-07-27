import { useEffect } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router-dom'
import routes from '../../../constants/routes'
import { useClientQuery, usePutClientMutation } from '../../../customHooks/request/clientsQuery'
import { useQueryClient } from 'react-query'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import endpoints from '../../../constants/endpoints'
import { useFreelancersQuery } from '../../../customHooks/request/freelancersQuery'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import useSwitchOnOff from '../../../customHooks/useSwitchOnOff'

import ClientPersonalData from './ClientPersonalData'
import FreelancerBilling from './ClientBilling'
import ClientProjects from './ClientProjects'
import ClientComments from './ClientComments'
import ClientsTickets from './ClientsTickets'

import { Box } from '@material-ui/core'
import Tabs from '../../../assets/UIkit/Tabs'

const ClientFindieDetail: React.FC = () => {
  const history = useHistory()
  const params = useParams<{ _id: string }>()
  const clientQuery = useClientQuery(params._id)
  const freelancersQuery = useFreelancersQuery({ $or: [{ freelancer_status: 'available' }] })
  const switchOnOff = useSwitchOnOff()
  const queryClient = useQueryClient()
  const putClientMutation = usePutClientMutation()
  useRequestAlert(putClientMutation)
  useSetLoader(clientQuery)
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
      id: 3,
      text: `Proyectos`,
      isSelected: false,
      action: () => tabAction('proyectos'),
    },
    // {
    //   id: 4,
    //   text: `Comentarios`,
    //   isSelected: false,
    //   action: () => history.push(`${routes.cpanel.clients.findie}/${params._id}/comentarios`),
    // },
    // {
    //   id: 5,
    //   text: `Ticket`,
    //   isSelected: false,
    //   action: () => history.push(`${routes.cpanel.clients.findie}/${params._id}/tickets`),
    // },
  ]

  const tabAction = (path: string) => {
    history.push(`${routes.cpanel.clients.findie}/${params._id}/${path}`)
    switchOnOff.setSwitchState(false)
  }

  useEffect(() => {
    history.push(`${routes.cpanel.clients.findie}/${params._id}/datos-personales`)
  }, [])

  useEffect(() => {
    putClientMutation.isSuccess && queryClient.refetchQueries(`one_${endpoints.clients}`)
  }, [putClientMutation.isSuccess])

  const componentsProps = {
    clientId: params._id,
    client: clientQuery,
    freelancersQuery: freelancersQuery,
    isInputsDisabled: !switchOnOff.switchState,
    putClientMutation: putClientMutation,
  }

  return (
    <>
      <h3>
        {clientQuery?.data?.name} {clientQuery?.data?.lastName}
      </h3>

      <Box className='flex justify-between mt-4'>
        <Tabs tabs={tabs} />
        {switchOnOff.render()}
      </Box>

      <Switch>
        <Route path={`${routes.cpanel.clients.findie}/:id/facturacion`}>
          <FreelancerBilling {...componentsProps} />
        </Route>
        <Route path={`${routes.cpanel.clients.findie}/:id/proyectos`}>
          <ClientProjects {...componentsProps} />
        </Route>
        <Route path={`${routes.cpanel.clients.findie}/:id/comentarios`} component={ClientComments} />
        <Route path={`${routes.cpanel.clients.findie}/:id/tickets`} component={ClientsTickets} />
        <Route exact={true}>
          <ClientPersonalData {...componentsProps} />
        </Route>
      </Switch>
    </>
  )
}

export default ClientFindieDetail
