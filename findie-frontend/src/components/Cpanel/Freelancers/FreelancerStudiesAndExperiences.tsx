import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UseQueryResult } from 'react-query'
import { IExperience, IFreelancer, IPortfolioImage, IStudy } from '../../../models/IFreelancer'
import useOpenDialog from '../../../customHooks/useOpenDialog'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import { usePutFreelancerMutation } from '../../../customHooks/request/freelancersQuery'

import {
  Box,
  Grid,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  Divider,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import InputField from '../../../assets/UIkit/Forms/InputField'
import AppDialog from '../../../assets/UIkit/AppDialog'
import { useCopyToClipboard } from '../../../customHooks/useCopyToClipboard'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'
import eye from '../../../assets/images/cpanel/freelancers/eye.svg'
import FiButton from '../../../assets/UIkit/FiButton'
import { parseVideoUrl } from '../../../utils/helpers'

type TFreelancerStudiesAndExperiences = {
  freelancerId: string
  freelancer: UseQueryResult<IFreelancer, unknown>
  isInputsDisabled: boolean
  afterFreelancerMutation: () => void
}

const FreelancerStudiesAndExperiences: React.FC<TFreelancerStudiesAndExperiences> = (props) => {
  const form = useForm()
  const copy = useCopyToClipboard()
  const putFreelancerMutation = usePutFreelancerMutation()
  useRequestAlert(putFreelancerMutation)
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (action: 'go_to_web' | 'copy_profile') => {
    const dispatch = {
      go_to_web: () => window.open(`${window.location.origin}/perfil/${props.freelancerId}`),
      copy_profile: () => copy.clipboard(`${window.location.origin}/perfil/${props.freelancerId}`),
    }
    dispatch[action]()
    setAnchorEl(null)
  }

  const openDialog = (
    position: { position: number } | IStudy | IPortfolioImage | undefined,
    action: 'studies' | 'experience' | 'delete'
  ) => {
    setRecuestAction(action)
    toogleDialog(position)
  }

  const closeDialog = () => {
    toogleDialog()
    form.reset()
  }

  const setStudy = (position: number) => {
    if (props.freelancer.isSuccess) {
      const study = props.freelancer.data.studies.find((iter: IStudy) => iter.position === position)
      return study
    }
  }

  const setExperience = (position: number) => {
    if (props.freelancer.isSuccess) {
      const experience = props.freelancer.data.experiences.find((iter: IExperience) => iter.position === position)
      return experience
    }
  }

  const addOrDeleteItem: SubmitHandler<IExperience & IStudy> = (data) => {
    if (recuestAction === 'delete') return deleteExperienceStudy()
    addExperienceOrStudy(data)
  }

  const addExperienceOrStudy = (data: IExperience & IStudy) => {
    if (!props.freelancer.isSuccess) return

    let experiences = undefined
    let studies = undefined

    if (data.rol && data.description) {
      const experience = {
        position: dialog.data.position,
        rol: data.rol,
        description: data.description,
        link: data.link,
      }
      const experiencesFiltered = props.freelancer.data.experiences.filter(
        (iter: IExperience) => iter.position !== dialog.data.position
      )
      experiences = [...experiencesFiltered, experience]
    }
    if (data.institution && data.degree && data.description) {
      const study = {
        position: dialog.data.position,
        institution: data.institution,
        degree: data.degree,
        description: data.description,
      }
      const studiesFiltered = props.freelancer.data.studies.filter((iter: IStudy) => iter.position !== dialog.data.position)
      studies = [...studiesFiltered, study]
    }
    const body = { experiences, studies, plan: props.freelancer?.data?.plan?._id ?? '' } as unknown as IFreelancer
    putFreelancerMutation.mutate(
      { body, _id: props.freelancerId },
      {
        onSuccess: () => afterMutation(),
      }
    )
  }

  const deleteExperienceStudy = () => {
    if (!props.freelancer.isSuccess) return

    let experiences = undefined
    let studies = undefined

    if (dialog.data.rol && dialog.data.description) {
      experiences = props.freelancer.data.experiences.filter((iter: IExperience) => iter.position !== dialog.data.position)
    }
    if (dialog.data.institution && dialog.data.degree && dialog.data.description) {
      studies = props.freelancer.data.studies.filter((iter: IStudy) => iter.position !== dialog.data.position)
    }
    const body = { experiences, studies, plan: props.freelancer?.data?.plan?._id ?? '' } as unknown as IFreelancer
    putFreelancerMutation.mutate(
      { body, _id: props.freelancerId },
      {
        onSuccess: () => afterMutation(),
      }
    )
  }

  const savePortfolioVideo = () => {
    if (!props.freelancer.isSuccess) return
    if (!form.watch('portfolio_video')) return

    const body = {
      portfolio_video: parseVideoUrl(form.watch('portfolio_video')),
      plan: props.freelancer?.data?.plan?._id ?? '',
    } as unknown as IFreelancer
    putFreelancerMutation.mutate(
      { body, _id: props.freelancerId },
      {
        onSuccess: () => {
          form.setValue('portfolio_video', '')
          props.afterFreelancerMutation()
        },
      }
    )
  }

  function afterMutation() {
    toogleDialog()
    form.reset()
    props.afterFreelancerMutation()
  }

  useEffect(() => {
    if (dialog?.data?.institution) {
      form.setValue('institution', dialog.data.institution)
      form.setValue('degree', dialog.data.degree)
      form.setValue('description', dialog.data.description)
    }
    if (dialog?.data?.rol) {
      form.setValue('rol', dialog.data.rol)
      form.setValue('description', dialog.data.description)
      form.setValue('link', dialog.data.link)
    }
  }, [dialog.data])

  useEffect(() => {
    if (form.watch('institution')) {
      form.setValue('institution', form.watch('institution').toUpperCase())
    }
  }, [form.watch('institution')])

  return (
    <div className='mt-6 w-11/12'>
      <Grid container>
        <Grid item lg={6}>
          <p className='subtitle4-medium'>XP destacadas</p>
          <List className='mt-6'>
            {[1, 2, 3, 4, 5].map((position: number) => {
              const isExperienceExist = setExperience(position)
              return (
                <ListItem dense={true} button key={position} className=''>
                  {isExperienceExist ? (
                    <Box display='grid' gridTemplateColumns='30px 1fr'>
                      <span className='body2-regular'>{position}.</span>
                      <span className='body2-regular'>{isExperienceExist.rol}</span>
                    </Box>
                  ) : (
                    <Box display='grid' gridTemplateColumns='30px 1fr'>
                      <span className='body2-regular'>{position}.</span>
                      <span className='body2-regular'>Nombre • Institución</span>
                    </Box>
                  )}
                  <ListItemSecondaryAction>
                    {isExperienceExist ? (
                      <>
                        {isExperienceExist.link && (
                          <a href={isExperienceExist.link} target='_blank'>
                            <FiIcons className='mr-2' name='link' />
                          </a>
                        )}
                        <FiIcons className='mr-2' name='edit' onClick={() => openDialog(isExperienceExist, 'experience')} />
                        <FiIcons name='skull' onClick={() => openDialog(isExperienceExist, 'delete')} />
                      </>
                    ) : (
                      <AddCircleOutlineIcon
                        className='text-blue cursor-pointer'
                        onClick={() => openDialog({ position }, 'experience')}
                      />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid item lg={6}>
          <div className='flex justify-between'>
            <p className='subtitle4-medium'>Educación formal - no formal</p>
            <div>
              <IconButton
                className='p-0'
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
              >
                <img src={eye} />
              </IconButton>
              <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => handleMenu('go_to_web')}>
                  <span className='buttontext2-regular'>Ir al perfil</span>
                </MenuItem>
                <MenuItem onClick={() => handleMenu('copy_profile')}>
                  <span className='buttontext2-regular'>Copiar link del perfil</span>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <List className='mt-4 py-0'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((position: number) => {
              const isStudyExist = setStudy(position)
              return (
                <ListItem dense={true} button key={position}>
                  {isStudyExist ? (
                    <Box display='grid' gridTemplateColumns='30px 1fr'>
                      <span className='body2-regular'>{position}.</span>
                      <span className='body2-regular'>{isStudyExist.institution}</span>
                    </Box>
                  ) : (
                    <Box display='grid' gridTemplateColumns='30px 1fr'>
                      <span className='body2-regular'>{position}.</span>
                      <span className='body2-regular'>Nombre • Institución</span>
                    </Box>
                  )}

                  <ListItemSecondaryAction>
                    {isStudyExist ? (
                      <>
                        <FiIcons className='mr-2' name='edit' onClick={() => openDialog(isStudyExist, 'studies')} />
                        <FiIcons name='skull' onClick={() => openDialog(isStudyExist, 'delete')} />
                      </>
                    ) : (
                      <AddCircleOutlineIcon
                        className='text-blue cursor-pointer'
                        onClick={() => openDialog({ position }, 'studies')}
                      />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </Grid>

      <p className='subtitle4-medium my-4'>Portafolio en video </p>
      <div className='flex justify-between'>
        <InputField
          name='portfolio_video'
          label='Url del video en youtube'
          className='w-full'
          inputProps={{ className: 'w-full' }}
          form={form}
        />
        <div className='w-56 ml-8 mt-6'>
          <FiButton onClick={savePortfolioVideo}>Agregar video</FiButton>
        </div>
      </div>

      {props.freelancer.data?.portfolio_video && (
        <iframe
          className='h-96 w-full mt-8'
          src={props.freelancer.data?.portfolio_video}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      )}

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'delete' ? 'Eliminar' : ''} ${recuestAction === 'studies' ? 'Educación' : 'Experiencia'}`}
        handleClose={closeDialog}
      >
        <form onSubmit={form.handleSubmit(addOrDeleteItem)}>
          {recuestAction === 'studies' && (
            <>
              <p className='subtitle4-medium mb-4 block mr-40'>Agregar nueva educación</p>
              <InputField
                name='institution'
                label='Institución'
                inputProps={{ className: 'w-full mb-4' }}
                options={{ required: 'Este campo es requerido' }}
                form={form}
              />
              <InputField
                name='degree'
                label='Grado obtenido'
                inputProps={{ className: 'w-full mb-4' }}
                options={{ required: 'Este campo es requerido' }}
                form={form}
              />
              <InputField
                name='description'
                label='Descripción'
                textarea
                textareaProps={{ className: 'w-full mb-4', rows: 3 }}
                options={{ required: 'Este campo es requerido' }}
                form={form}
              />
            </>
          )}
          {recuestAction === 'experience' && (
            <>
              <span className='body1-medium mb-4 block mr-40'>Agregar nueva experiencia</span>
              <InputField
                name='rol'
                label='Titulo'
                inputProps={{ className: 'w-full mb-4' }}
                options={{ required: 'Este campo es requerido' }}
                form={form}
              />
              <InputField
                name='description'
                label='Descripción'
                textarea
                textareaProps={{ className: 'w-full mb-4', rows: 3 }}
                options={{ required: 'Este campo es requerido' }}
                form={form}
              />
              <InputField name='link' label='Link' inputProps={{ className: 'w-full mb-4' }} form={form} />
            </>
          )}
          {recuestAction === 'delete' && (
            <span className='buttontext4-regular mb-4 block'>
              ¿Estas seguro de eliminar {dialog?.data?.institution && 'el estudio: '}
              {dialog?.data?.rol && 'la experiencia'}
              {dialog?.data?.file_name && `la imagen ${dialog?.data?.file_name} del portafolio?`}
              <span className='body1-bold'>
                {dialog?.data?.institution && dialog?.data?.institution} {dialog?.data?.institution && dialog?.data?.rol}
              </span>
              ?
            </span>
          )}

          <Divider className='mt-4' />
          <Box display='flex' justifyContent='flex-end' mt={2}>
            <Button variant='contained' className='mr-4' onClick={closeDialog}>
              Cancelar
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Aceptar
            </Button>
          </Box>
        </form>
      </AppDialog>
    </div>
  )
}

export default FreelancerStudiesAndExperiences
