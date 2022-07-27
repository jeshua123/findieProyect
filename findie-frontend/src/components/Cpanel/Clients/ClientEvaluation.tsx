import { useParams, useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import routes from '../../../constants/routes'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import { useClientQuery, useDeleteClientMutation, usePutClientMutation } from '../../../customHooks/request/clientsQuery'
import { useProjectsQuery } from '../../../customHooks/request/projectsQuery'

import ClientsForm from '../../../shared/ClientsForm/ClientsForm'

import { Box, Button, Chip, Divider } from '@material-ui/core'
import AppDialog from '../../../assets/UIkit/AppDialog'
import { ISkill } from '../../../models/ISkill'

const defaultProject = {
  category: { name: '' },
  plan: { name: '' },
  title: '',
  brief: '',
  budget: '',
  skills: [],
  proposed_options: { category: '', skills: [] },
}

const ClientEvaluation: React.FC = () => {
  const history = useHistory()
  const params = useParams<{ _id: string }>()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const form = useForm()
  const clientQuery = useClientQuery(params._id)
  const projectQuery = useProjectsQuery({ client: params._id })
  const putClientMutation = usePutClientMutation()
  const deleteclientMutation = useDeleteClientMutation()
  useRequestAlert(putClientMutation, undefined, afterMutation)
  useRequestAlert(deleteclientMutation, undefined, afterMutation)
  const project = projectQuery.isSuccess ? projectQuery.data?.data[0] : defaultProject

  const openDialog = (action: 'post' | 'edit' | 'delete') => {
    setRecuestAction(action)
    toogleDialog()
  }

  const availableOrDelete = () => {
    recuestAction === 'edit' && putClientMutation.mutate({ body: { client_status: 'available' }, _id: params._id })
    recuestAction === 'delete' && deleteclientMutation.mutate(params._id)
  }

  function afterMutation() {
    toogleDialog()
    history.push(routes.cpanel.clients.postulations)
  }

  return (
    <>
      <h3>Evaluación de cliente</h3>
      <Box>
        <ClientsForm client={clientQuery} form={form} isDisabledFields={true} />

        {projectQuery.isSuccess && projectQuery.data?.data.length > 0 && (
          <>
            <Divider className='mt-8 mb-4' />
            <p className='subtitle4-medium mt-2'>
              Categoría: <span className='body2-regular'>{project?.category.name}</span>
            </p>
            <p className='subtitle4-medium mt-2'>
              Plan: <span className='body2-regular'>{project?.plan?.name}</span>
            </p>
            <p className='subtitle4-medium mt-2'>
              Titulo: <span className='body2-regular'>{project?.title}</span>
            </p>
            <p className='subtitle4-medium mt-2'>
              Descripción: <span className='body2-regular'>{project?.brief}</span>
            </p>
            <p className='subtitle4-medium mt-2'>
              Presupuesto: <span className='body2-regular'>{project?.budget}</span>
            </p>
            {project?.proposed_options?.category ? (
              <p className='subtitle4-medium mt-2'>
                Categoría propuesta: <span className='body2-regular'>{project?.proposed_options?.category}</span>
              </p>
            ) : (
              <p className='subtitle4-medium mt-2'>
                Categoría: <span className='body2-regular'>{project?.category?.name}</span>
              </p>
            )}
            {project?.proposed_options?.skills.length > 0 ? (
              <Box display='grid' gridTemplateColumns='250px 1fr'>
                <p className='subtitle4-medium mt-2 '>Habilidades propuestas: </p>
                <div className='pr-4 py-2 flex flex-wrap'>
                  {project.proposed_options.skills.map((skill: string) => {
                    return <Chip key={skill} label={skill} color='primary' variant='outlined' className='mr-2 mt-2' />
                  })}
                </div>
              </Box>
            ) : (
              <>
                {project?.skills.length > 0 && (
                  <Box display='grid' gridTemplateColumns='140px 1fr'>
                    <p className='subtitle4-medium mt-2 '>Habilidades: </p>
                    <div className='pr-4 py-2 flex flex-wrap'>
                      {project.skills.map((skill: ISkill) => {
                        return (
                          <Chip key={skill._id} label={skill.name} color='primary' variant='outlined' className='mr-2 mt-2' />
                        )
                      })}
                    </div>
                  </Box>
                )}
              </>
            )}
          </>
        )}

        <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
          <Button variant='outlined' color='primary' className='mr-4' onClick={() => openDialog('delete')}>
            Eliminar
          </Button>
          <Button variant='contained' color='primary' onClick={() => openDialog('edit')}>
            Aprobar
          </Button>
        </Box>
      </Box>

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'edit' ? 'Editar' : 'Eliminar'} freelancer`}
        handleClose={toogleDialog}
      >
        {recuestAction === 'edit' ? (
          <span className='subtitle4-medium'>
            ¿Estás seguro que deseas convertir a {`${clientQuery?.data?.name} ${clientQuery?.data?.lastName}`} en client findie?
          </span>
        ) : (
          <span className='subtitle4-medium'>
            ¿Estás seguro que deseas eliminar a {`${clientQuery?.data?.name} ${clientQuery?.data?.lastName}`} de la lista de
            postulantes?
          </span>
        )}

        <Divider className='mt-4' />
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-4' onClick={toogleDialog}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary' onClick={availableOrDelete}>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </>
  )
}

export default ClientEvaluation
