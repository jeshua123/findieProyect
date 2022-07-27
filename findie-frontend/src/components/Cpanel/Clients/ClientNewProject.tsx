import { useForm } from 'react-hook-form'
import { UseQueryResult } from 'react-query'
import { Link, useHistory } from 'react-router-dom'
import routes from '../../../constants/routes'
import { usePostProjectMutation } from '../../../customHooks/request/projectsQuery'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { IFreelancer } from '../../../models/IFreelancer'
import { IMetadata } from '../../../models/IMetadata'

import ProjectForm from '../../../shared/Project/ProjectForm'

import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { cleanCLP } from '../../../utils/helpers'

type TClientNewProject = {
  clientId: string
  isDisabledFields?: boolean
  freelancersQuery: UseQueryResult<{ data: IFreelancer[]; metadata: IMetadata }>
}

const ClientNewProject: React.FC<TClientNewProject> = (props) => {
  const form = useForm()
  const navigate = useHistory().push
  const postProjectMutation = usePostProjectMutation()
  useRequestAlert(postProjectMutation, form, afterPostMutation)

  const createProject = (data: any) => {
    const body = {
      ...data,
      price: { ...data.price, subtotal: cleanCLP(data.price.subtotal) },
      createdAt: new Date().getTime(),
      client: props.clientId,
      evaluation_status: 'step_two',
    }
    postProjectMutation.mutate(body)
  }

  function afterPostMutation() {
    navigate(`${routes.cpanel.clients.findie}/${props.clientId}/proyectos`)
  }

  return (
    <form onSubmit={form.handleSubmit(createProject)}>
      <div className='flex justify-end mt-6'>
        <Link
          to={`${routes.cpanel.clients.findie}/${props.clientId}/proyectos`}
          className='body1-medium flex items-center cursor-pointer'
        >
          <ArrowBackIcon /> Volver
        </Link>
      </div>
      <ProjectForm isDisabledFields={props.isDisabledFields} form={form} />

      <div className='flex justify-end mt-4'>
        <Button variant='contained' color='primary' type='submit' disabled={props.isDisabledFields}>
          Crear proyecto
        </Button>
      </div>
    </form>
  )
}

export default ClientNewProject
