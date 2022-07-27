import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../constants/routes'
import { useDeleteProjectMutation } from '../../customHooks/request/projectsQuery'
import useOpenDialog, { TRequestAction } from '../../customHooks/useOpenDialog'
import useRequestAlert from '../../customHooks/useRequestAlert'
import { useSetLoader } from '../../customHooks/useSetLoader'
import { IProject } from '../../models/IProject'
import { TProjectSections, TProjectView } from './Project'

import { Box, Button, Divider, Step, StepLabel, Stepper } from '@material-ui/core'
import AppDialog from '../../assets/UIkit/AppDialog'
import { AprroveOrDeleteProject, FinishProject, SuspendProject } from './ProjectDialogactions'
import { projectSteps } from '../../constants/Cpanel/ClientesConstant'

type TActiveStep = {
  step: number
  stepName: 'step_one' | 'step_two' | 'step_three' | 'step_four' | 'step_five'
}
const defaultActiveStep: TActiveStep = { step: 1, stepName: 'step_one' }

const proccesStatusMessage = (text: string, textColor: string) => {
  return (
    <span className={`subtitle4-regular ${textColor}`} text-red>
      {text}
    </span>
  )
}

const ProjectEvaluation: React.FC<TProjectSections & { setprojectView: (view: TProjectView) => void }> = (props) => {
  const history = useHistory()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const deleteProjectMutation = useDeleteProjectMutation()
  useRequestAlert(deleteProjectMutation)
  useSetLoader(props.project)
  const [activeStep, setActiveStep] = useState<TActiveStep>(defaultActiveStep)
  const [areYouSure, setAreYouSure] = useState<boolean>(false)
  const project = props.project.data

  const getStepName = (stepNumber: number) => {
    const stepName: any = {
      1: () => 'step_one',
      2: () => 'step_two',
      3: () => {
        props.setprojectView('freelancer')
        return 'step_three'
      },
      4: () => {
        props.setprojectView('calculator')
        return 'step_four'
      },
      5: () => {
        return 'step_five'
      },
    }
    return stepName[stepNumber]()
  }

  const handleNext = () => {
    if (!project) return
    if (activeStep.step === 5) return openDialog('approve')

    const newStep = activeStep.step + 1
    const body = {
      evaluation_status: getStepName(newStep),
    }
    setActiveStep({ ...activeStep, step: newStep, stepName: getStepName(newStep) })
    props.updateProjectMutation.mutate({ body, _id: project._id ?? '' })
  }

  const handleBack = () => {
    const newStep = activeStep.step - 1
    const updatedReviewStep: Partial<IProject> = { evaluation_status: getStepName(newStep) }
    setActiveStep({ ...activeStep, step: newStep, stepName: getStepName(newStep) })
    props.updateProjectMutation.mutate({ body: updatedReviewStep, _id: project?._id ?? '' })
  }

  const openDialog = (action: TRequestAction) => {
    setRecuestAction(action)
    toogleDialog()
  }

  const closeDialog = () => {
    toogleDialog()
    setAreYouSure(false)
  }

  const handleProject = () => {
    recuestAction === 'approve' && handleProjectStatus('in_progress')
    recuestAction === 'delete' && deleteProject()
    recuestAction === 'suspend' && handleProjectStatus('cancelled')
    recuestAction === 'finished' && handleProjectStatus('finished')
  }

  const handleProjectStatus = (project_status: 'in_progress' | 'cancelled' | 'finished') => {
    const body = { project_status }

    if (['cancelled', 'finished'].includes(project_status)) {
      props.finishCancellProjectMutation.mutate(
        { body, _id: props.project?.data?._id ?? '' },
        {
          onSuccess: (res) => {
            toogleDialog()
            res?.project_status === 'in_progress' && props.setprojectView('payment_record')
          },
        }
      )
      return
    }
    props.updateProjectMutation.mutate(
      { body, _id: props.project?.data?._id ?? '' },
      {
        onSuccess: (res) => {
          toogleDialog()
          res?.project_status === 'in_progress' && props.setprojectView('payment_record')
        },
      }
    )
  }

  const deleteProject = () => {
    deleteProjectMutation.mutate(props.project?.data?._id ?? '', {
      onSuccess: () => {
        history.push(`${routes.cpanel.clients.findie}/${props.clientId}/proyectos`)
        toogleDialog()
      },
    })
  }

  const setEvaluationStatus = () => {
    let evaluationStatus = { isButtonDisabled: true, message: <span></span> }
    if (!props.project.isSuccess) return evaluationStatus

    if (project?.evaluation_status === 'step_one' && project.price.subtotal === 0) {
      evaluationStatus.message = proccesStatusMessage(
        '✋ Para avanzar en el proceso, verifica los datos suministrados definie presupuesto del proyecto. ✋',
        'text-red'
      )
      return evaluationStatus
    }
    if (project?.evaluation_status === 'step_two' && project.stack_list.length === 0) {
      evaluationStatus.message = proccesStatusMessage(
        '✋ Para avanzar con el proceso, debes seleccionar un stack de trabajo al proyecto. ✋',
        'text-red'
      )
      return evaluationStatus
    }
    if (project?.evaluation_status === 'step_three' && project.price.available_budget === project.price.subtotal) {
      evaluationStatus.message = proccesStatusMessage(
        '✋ Para avanzar con el proceso en freelancers, debes asignar uno a cada stack y el costo de su trabajo. ✋',
        'text-red'
      )
      return evaluationStatus
    }
    if (project?.evaluation_status === 'step_four' && !project.price?.sii_tax?.type && !project.price?.payment_method?.method) {
      evaluationStatus.message = proccesStatusMessage(
        '✋ Para avanzar con el proceso, debes asignar SII y metodo de pago en la calculadora. ✋',
        'text-red'
      )
      return evaluationStatus
    }

    return {
      isButtonDisabled: false,
      message: <span className='subtitle4-regular text-soft-green'>🎉 Puedes continuar con el proceso. 🎉</span>,
    }
  }

  useEffect(() => {
    if (props.project.isSuccess) {
      const evaluationStep: { [key: string]: () => void } = {
        step_one: () => setActiveStep({ step: 1, stepName: 'step_one' }),
        step_two: () => setActiveStep({ step: 2, stepName: 'step_two' }),
        step_three: () => setActiveStep({ step: 3, stepName: 'step_three' }),
        step_four: () => setActiveStep({ step: 4, stepName: 'step_four' }),
        step_five: () => setActiveStep({ step: 5, stepName: 'step_five' }),
      }
      evaluationStep[props.project.data.evaluation_status] && evaluationStep[props.project.data.evaluation_status]()
    }
  }, [props.project.isSuccess])

  return (
    <>
      {props.project.isSuccess && props.project.data.project_status === 'not_approved' && (
        <div className='mt-12'>
          <h3>
            Progreso:{' '}
            {project?.evaluation_status === 'step_five'
              ? proccesStatusMessage(
                  '😎 Has terminado!!! Al hacer click en APROBAR, podrás asignar pagos al proyecto. 😎',
                  'text-blue'
                )
              : setEvaluationStatus().message}
          </h3>
          <div className='w-full'>
            <Stepper activeStep={activeStep.step}>
              {projectSteps.map((step) => {
                return (
                  <Step key={step.title}>
                    <StepLabel icon={activeStep.step >= step.number ? step.activeIcon : step.icon}>
                      <p className='microcopy2'>{step.title}</p>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>

            <Box display='flex' justifyContent='space-between' mt={2}>
              <Button color='secondary' type='button' onClick={() => openDialog('delete')}>
                Eliminar
              </Button>
              <Box>
                <Button disabled={activeStep.step === 1} type='button' onClick={handleBack} className='mr-4'>
                  Atras
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  type='button'
                  onClick={handleNext}
                  disabled={setEvaluationStatus().isButtonDisabled}
                  className='mr-4'
                >
                  {activeStep.step === 5 ? 'Aprobar' : 'Siguiente'}
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      )}

      {props.project.data?.project_status === 'in_progress' && (
        <>
          <Divider className='mt-4' />
          <Box display='flex' justifyContent='end' alignItems='center' mt={2}>
            <Box>
              <Button variant='contained' className='mr-4 bg-red text-white' onClick={() => openDialog('suspend')}>
                Cancelar proyecto
              </Button>
              <Button variant='contained' className='bg-soft-green text-white' onClick={() => openDialog('finished')}>
                Terminar poryecto
              </Button>
            </Box>
          </Box>
        </>
      )}

      <AppDialog open={dialog.isOpen} title={`Aprobar proyecto`} handleClose={closeDialog}>
        {(recuestAction === 'approve' || recuestAction === 'delete') && (
          <AprroveOrDeleteProject project={props.project} recuestAction={recuestAction} />
        )}
        {recuestAction === 'suspend' && <SuspendProject areYouSure={areYouSure} recuestAction={recuestAction} />}
        {recuestAction === 'finished' && <FinishProject areYouSure={areYouSure} recuestAction={recuestAction} />}

        <Divider className='mt-4' />
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-4' onClick={closeDialog}>
            Cancelar
          </Button>
          {(recuestAction === 'suspend' || recuestAction === 'finished') && !areYouSure && (
            <Button variant='contained' color='primary' onClick={() => setAreYouSure(true)}>
              Si, ya hice el procedimiento.
            </Button>
          )}
          {(areYouSure || recuestAction === 'delete' || recuestAction === 'approve') && (
            <Button variant='contained' color='primary' onClick={handleProject}>
              Aceptar
            </Button>
          )}
        </Box>
      </AppDialog>
    </>
  )
}

export default ProjectEvaluation
