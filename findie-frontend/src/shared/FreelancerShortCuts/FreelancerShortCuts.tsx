import {
  useDeleteFeelancerMutation,
  usePutFreelancerMutation,
  useHandleFeatureFreelancerMutation,
} from '../../customHooks/request/freelancersQuery'
import { IFreelancer } from '../../models/IFreelancer'
import useRequestAlert from '../../customHooks/useRequestAlert'
import useOpenDialog, { TRequestAction } from '../../customHooks/useOpenDialog'
import { useHistory } from 'react-router-dom'
import { IMetadata } from '../../models/IMetadata'
import routes from '../../constants/routes'
import { UseQueryResult } from 'react-query'

import AppDialog from '../../assets/UIkit/AppDialog'

import { Box, Button, Divider, IconButton } from '@material-ui/core'
import { FiIcons } from '../../assets/UIkit/Icons/FiIcons'
import FindieIsotype from '../Brand/Isotype/FindieIsotype'

type TFreelancerShortCuts = {
  freelancer: IFreelancer
  freelancerDetail?: boolean
  page?: number
  freelancersQuery: UseQueryResult<{ data: IFreelancer[]; metadata: IMetadata }, unknown> | UseQueryResult<IFreelancer, unknown>
}

const FreelancerShortCuts: React.FC<TFreelancerShortCuts> = (props) => {
  const history = useHistory()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const putFeelancerMutation = usePutFreelancerMutation()
  const handleFeatureFreelancerMutation = useHandleFeatureFreelancerMutation()
  const deleteFeelancerMutation = useDeleteFeelancerMutation()
  useRequestAlert(putFeelancerMutation, undefined, afterMutate)
  useRequestAlert(handleFeatureFreelancerMutation, undefined, afterMutate)
  useRequestAlert(deleteFeelancerMutation, undefined, afterMutate)

  const setStatusIcon = () => {
    if (props.freelancer.current_projects.length > 0) return 'bg-blue'
    if (props.freelancer.is_available_to_work) return 'bg-soft-green'
    if (!props.freelancer.is_available_to_work) return 'bg-red'
    return ''
  }

  const openDialog = (freelancer: IFreelancer, action: TRequestAction) => {
    setRecuestAction(action)
    toogleDialog(freelancer)
  }

  const handleShortCuts = () => {
    const shortCutsActions: { [key: string]: () => void } = {
      edit: () => setFeaturedfreelancerStatus(),
      suspend: () => suspendingFreelancer(),
      hidden: () => hiddenFreelancer(),
      featured: () => featureFreelancer(),
      delete: () => deleteFreelancer(),
    }
    shortCutsActions[recuestAction] && shortCutsActions[recuestAction]()
  }

  const setFeaturedfreelancerStatus = () => {
    const body = {
      featured_status: {
        ...dialog.data.featured_status,
        is_featured: !dialog.data.featured_status.is_featured,
        has_feartued_icon: false,
        position_date: new Date().getTime(),
      },
    }
    handleFeatureFreelancerMutation.mutate({
      body,
      _id: dialog.data._id,
      category: dialog.data.category._id,
    })
  }

  const hiddenFreelancer = () => {
    putFeelancerMutation.mutate({ body: { is_hidden: !dialog.data.is_hidden }, _id: dialog.data._id })
  }

  const suspendingFreelancer = () => {
    putFeelancerMutation.mutate({
      body: {
        freelancer_status: dialog.data.freelancer_status === 'suspended' ? 'available' : 'suspended',
        featured_status: { is_featured: false, has_feartued_icon: false, position: 0, position_date: new Date().getTime() },
      },
      _id: dialog.data._id,
    })
  }

  const featureFreelancer = () => {
    putFeelancerMutation.mutate({
      body: {
        featured_status: { ...dialog.data.featured_status, has_feartued_icon: !dialog.data.featured_status.has_feartued_icon },
      },
      _id: dialog.data._id,
    })
  }

  const deleteFreelancer = () => {
    deleteFeelancerMutation.mutate(dialog.data._id)
    props.freelancerDetail && history.push(`${routes.cpanel.freelancers.findie}`)
  }

  function afterMutate() {
    toogleDialog()
    props.freelancersQuery.refetch()
  }

  return (
    <>
      <Box>
        <IconButton edge='end' disabled={true}>
          <div className={`w-3 h-3 rounded-full ${setStatusIcon()}`} />
        </IconButton>
        <IconButton edge='end' onClick={() => openDialog(props.freelancer, 'edit')} disabled={props.freelancerDetail}>
          <FiIcons name='star' className={`${props.freelancer.featured_status.is_featured && 'svg-orange'}`} />
        </IconButton>
        <IconButton edge='end' onClick={() => openDialog(props.freelancer, 'featured')} disabled={props.freelancerDetail}>
          <FindieIsotype
            variant={props.freelancer.featured_status.has_feartued_icon ? 'degrade' : 'outlined-black'}
            className='w-6 h-6'
          />
        </IconButton>
        <IconButton edge='end' onClick={() => openDialog(props.freelancer, 'hidden')} disabled={props.freelancerDetail}>
          <FiIcons name='eye' className={`${props.freelancer.is_hidden && 'svg-white'}`} />
        </IconButton>
        <IconButton edge='end' onClick={() => openDialog(props.freelancer, 'suspend')} disabled={props.freelancerDetail}>
          <FiIcons name='suspended' className={`${props.freelancer.freelancer_status === 'suspended' && 'svg-red'}`} />
        </IconButton>
        {!props.freelancerDetail && (
          <IconButton edge='end' onClick={() => openDialog(props.freelancer, 'delete')}>
            <FiIcons name='skull' className='svg-soft-gray' />
          </IconButton>
        )}
      </Box>

      <AppDialog open={dialog.isOpen} title='Suspender Freelancer' handleClose={toogleDialog}>
        {recuestAction === 'edit' && (
          <span className='subtitle4-medium'>
            {dialog?.data?.featured_status?.is_featured
              ? `Estás seguro que deseas quitar el status de "Destacado(a) a ${dialog?.data?.name}`
              : `¿Estás seguro que deseas destacar a ${dialog?.data?.name}?. Si lo haces, el freelancer tendrá el status de disponible
              aun cuando su estado actual sea "suspendido".`}
          </span>
        )}
        {recuestAction === 'featured' && (
          <span className='subtitle4-medium'>
            {dialog?.data?.featured_status?.has_feartued_icon
              ? `Estás seguro que deseas quitar el sello destacado a ${dialog?.data?.name}`
              : `¿Estás seguro que deseas agregar el sello destacado a ${dialog?.data?.name}?.`}
          </span>
        )}
        {recuestAction === 'suspend' && (
          <span className='subtitle4-medium'>
            {dialog?.data?.featured_status?.has_feartued_icon
              ? `Estás seguro que deseas quitar el status de "suspendido(a) a ${dialog?.data?.name}`
              : `¿Estás seguro que deseas suspender a ${dialog?.data?.name}?. Si lo haces, el freelancer no tendrá la posibilidad de
              acceder a la plataforma, y si tiene el status de "Destacado", la perderá.`}
          </span>
        )}
        {recuestAction === 'hidden' && (
          <span className='subtitle4-medium'>
            {dialog?.data?.featured_status?.has_feartued_icon
              ? `Estás seguro que deseas mostrar a ${dialog?.data?.name}`
              : `¿Estás seguro que deseas esconder a ${dialog?.data?.name}?. Si lo haces, el freelancer no será visible en la web.`}
          </span>
        )}
        {recuestAction === 'delete' && (
          <span className='subtitle4-medium'>¿Estás seguro que deseas eliminar a {dialog?.data?.name}?.</span>
        )}
        <Divider className='my-3' />

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-2' onClick={toogleDialog}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary' onClick={handleShortCuts}>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </>
  )
}

export default FreelancerShortCuts
