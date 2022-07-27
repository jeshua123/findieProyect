import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import useRequestAlert from '../../../customHooks/useRequestAlert'
import {
  useDeleteFeelancerMutation,
  useFreelancerQuery,
  usePutFreelancerMutation,
  useRemovePortfolioPdf,
} from '../../../customHooks/request/freelancersQuery'
import routes from '../../../constants/routes'
import useOpenDialog from '../../../customHooks/useOpenDialog'

import FreelancersForm from '../../../shared/FreelancersForm/FreelancersForm'

import { Box, Button, Divider, Step, StepLabel, Stepper } from '@material-ui/core'
import AppDialog from '../../../assets/UIkit/AppDialog'
import { freelancerSteps } from '../../../constants/Cpanel/FreelancersConstant'

type TActiveStep = {
  step: number
  stepName: 'step_one' | 'step_two' | 'step_three'
}

const defaultActiveStep: TActiveStep = { step: 1, stepName: 'step_one' }

const FreelancerEvaluation: React.FC = () => {
  const history = useHistory()
  const params = useParams<{ _id: string }>()
  const { dialog, recuestAction, toogleDialog, setRecuestAction } = useOpenDialog()
  const form = useForm()
  const freelancerQuery = useFreelancerQuery(params._id)
  const deleteFeelancerMutation = useDeleteFeelancerMutation()
  const updateFreelancerProcessMutation = usePutFreelancerMutation()
  const availableFreelancerMutation = usePutFreelancerMutation()
  const removePortfolioMutation = useRemovePortfolioPdf()
  useRequestAlert(updateFreelancerProcessMutation)
  useRequestAlert(availableFreelancerMutation, undefined, afterMutation)
  useRequestAlert(deleteFeelancerMutation, undefined, afterMutation)
  const [activeStep, setActiveStep] = useState<TActiveStep>(defaultActiveStep)

  const handleNext = () => {
    if (activeStep.step === 3) {
      openDialog('edit')
      return
    }
    const newStep = activeStep.step + 1
    const restStepData = getStepName(newStep)
    const updatedReviewStep = { postulation_status: restStepData.stepName }
    setActiveStep({
      ...activeStep,
      step: newStep,
      stepName: getStepName(newStep).stepName,
    })
    updateFreelancerProcessMutation.mutate({ body: updatedReviewStep, _id: params._id })
  }

  const handleBack = () => {
    if (activeStep.step === 3) {
      setActiveStep(defaultActiveStep)
      updateFreelancerProcessMutation.mutate({ body: { postulation_status: 'step_one' }, _id: params._id })
      return
    }
    const newStep = activeStep.step - 1
    const restStepData = getStepName(newStep)
    const updatedReviewStep = { postulation_status: restStepData.stepName }
    setActiveStep({
      ...activeStep,
      step: newStep,
      stepName: restStepData.stepName,
    })
    updateFreelancerProcessMutation.mutate({ body: updatedReviewStep, _id: params._id })
  }

  const getStepName = (stepNumber: number) => {
    const stepName: any = {
      1: { stepName: 'step_one' },
      2: { stepName: 'step_two' },
      3: { stepName: 'step_three' },
    }
    return stepName[stepNumber]
  }

  const openDialog = (action: 'post' | 'edit' | 'delete') => {
    setRecuestAction(action)
    toogleDialog()
  }

  const availableOrDelete = () => {
    if (recuestAction === 'edit') {
      availableFreelancerMutation.mutate(
        { body: { freelancer_status: 'suspended' }, _id: params._id },
        {
          onSuccess: () => removePortfolioMutation.mutate({ _id: freelancerQuery?.data?._id ?? '' }),
        }
      )
    }

    recuestAction === 'delete' && deleteFeelancerMutation.mutate(params._id)
  }

  function afterMutation() {
    toogleDialog()
    history.push(`${routes.cpanel.freelancers.postulations}`)
  }

  useEffect(() => {
    if (freelancerQuery.isSuccess) {
      const evaluationStep: { [key: string]: () => void } = {
        step_one: () => setActiveStep({ step: 1, stepName: 'step_one' }),
        step_two: () => setActiveStep({ step: 2, stepName: 'step_two' }),
        step_three: () => setActiveStep({ step: 3, stepName: 'step_three' }),
      }
      evaluationStep[freelancerQuery.data.postulation_status] && evaluationStep[freelancerQuery.data.postulation_status]()
    }
  }, [freelancerQuery.isSuccess])

  return (
    <>
      <h3>Formularios Recibidos</h3>
      <form>
        <FreelancersForm freelancer={freelancerQuery} form={form} isDisabledFields asPostulation />
      </form>

      <h3 className='mt-16'>Evaluación</h3>
      <div className='w-full'>
        <Stepper activeStep={activeStep.step}>
          {freelancerSteps.map((step) => {
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
          <Button color='secondary' onClick={() => openDialog('delete')}>
            Eliminar
          </Button>
          <Box>
            <Button disabled={activeStep.step === 1} onClick={handleBack} className='mr-2'>
              {activeStep.step === 3 ? 'Reset' : 'Atras'}
            </Button>
            <Button variant='contained' color='primary' onClick={handleNext} className='mr-2'>
              {activeStep.step === 3 ? 'Registrar' : 'Siguiente'}
            </Button>
          </Box>
        </Box>
      </div>

      <AppDialog
        open={dialog.isOpen}
        title={`${recuestAction === 'edit' ? 'Editar' : 'Eliminar'} freelancer`}
        handleClose={toogleDialog}
      >
        {recuestAction === 'edit' ? (
          <span className='subtitle4-medium'>
            ¿Estas seguro que deseas convertir a {`${freelancerQuery?.data?.name} ${freelancerQuery?.data?.lastName}`} en
            freelancer findie?
          </span>
        ) : (
          <span className='subtitle4-medium'>
            ¿Estas seguro que deseas eliminar a {`${freelancerQuery?.data?.name} ${freelancerQuery?.data?.lastName}`} de la lista
            de postulantes?
          </span>
        )}

        <Divider className='mt-2' />
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-2' onClick={toogleDialog}>
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

export default FreelancerEvaluation
