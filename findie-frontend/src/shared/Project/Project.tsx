import { useMemo, useState } from 'react'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  useFinishCancellProjectMutation,
  useFreelancerStackMutation,
  useProjectQuery,
  usePutProjectMutation,
  usePutProjectPriceMutation,
  useSuspendStackMutation,
  useUFQuery,
  useUpdateWithCalculatorMutation,
} from '../../customHooks/request/projectsQuery'
import routes from '../../constants/routes'
import useRequestAlert from '../../customHooks/useRequestAlert'
import { useDeletePaymentMutation, usePostPaymentMutation, usePutPaymentMutation } from '../../customHooks/request/paymetsQuery'
import { IPayment } from '../../models/IPayment'
import { IProject } from '../../models/IProject'

import Tabs from '../../assets/UIkit/Tabs'
import ProjectDescription from './ProjectDescription'
import ProjectCalculator from './ProjectCalculator'
import ProjectPayments from './ProjectPayments'
import ProjectEvaluation from './ProjectEvaluation'
import Projectfreelancers from './ProjectFreelancers'

import { Box } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useSetLoader } from '../../customHooks/useSetLoader'

export type TProjectView = 'project' | 'freelancer' | 'calculator' | 'payment_record'
type TProject = {
  asClient?: boolean
  isDisabledFields?: boolean
}
export type TProjectSections = {
  clientId?: string
  isDisabledFields?: boolean
  project: UseQueryResult<IProject, unknown>
  updateProjectMutation: UseMutationResult<IProject, unknown, { body: Partial<IProject>; _id: string }, unknown>
  updateProjectPriceMutation: UseMutationResult<IProject, unknown, { body: Partial<IProject>; _id: string }, unknown>
  stackMutation: UseMutationResult<IProject, unknown, { body: Partial<IProject>; _id: string }, unknown>
  suspendStackQuery: UseMutationResult<IProject, unknown, { body: Partial<IProject>; _id: string }, unknown>
  calculatorMutation: UseMutationResult<IProject, unknown, { body: Partial<IProject>; _id: string }, unknown>
  postPaymentMutation: UseMutationResult<any, unknown, IPayment, unknown>
  putPaymentMutation: UseMutationResult<IPayment, unknown, { body: Partial<IPayment>; _id: string }, unknown>
  deletePaymentMutation: UseMutationResult<{ data: IPayment }, unknown, string, unknown>
  finishCancellProjectMutation: UseMutationResult<IProject, unknown, { body: Partial<IProject>; _id: string }, unknown>
  form: UseFormReturn<any>
  uf: any
  setInputDefaultProps: (param: TInputProps) => any
}
export type TInputProps = {
  name: string
  label?: string
  type?: string
  pholder?: string
  className?: string
  inputClassName?: string
  form?: UseFormReturn<any>
  isDisabled?: boolean
  step?: string
}

const Project: React.FC<TProject> = (props) => {
  const params = useParams<{ projectId: string; clientId: string }>()
  const form = useForm()
  const uf = useUFQuery()
  const projectQuery = useProjectQuery(params.projectId)
  const updateProjectMutation = usePutProjectMutation()
  const updateProjectPriceMutation = usePutProjectPriceMutation()
  const stackMutation = useFreelancerStackMutation()
  const suspendStackQuery = useSuspendStackMutation()
  const calculatorMutation = useUpdateWithCalculatorMutation()
  const postPaymentMutation = usePostPaymentMutation()
  const putPaymentMutation = usePutPaymentMutation()
  const deletePaymentMutation = useDeletePaymentMutation()
  const finishCancellProjectMutation = useFinishCancellProjectMutation()
  useSetLoader(projectQuery)
  useRequestAlert(stackMutation, undefined, refetchProject)
  useRequestAlert(suspendStackQuery, undefined, refetchProject)
  useRequestAlert(updateProjectMutation, undefined, refetchProject)
  useRequestAlert(updateProjectPriceMutation, undefined, refetchProject)
  useRequestAlert(calculatorMutation, undefined, refetchProject)
  useRequestAlert(putPaymentMutation, undefined, refetchProject)
  useRequestAlert(deletePaymentMutation, undefined, refetchProject)
  useRequestAlert(postPaymentMutation, undefined, refetchProject)
  useRequestAlert(finishCancellProjectMutation, undefined, refetchProject)
  const [projectView, setprojectView] = useState<TProjectView>('project')
  const project = projectQuery.data
  const freelancerCondition = ['step_one', 'step_two'].includes(project?.evaluation_status ?? '')
  const calculatorCondition = ['step_one', 'step_two', 'step_three'].includes(project?.evaluation_status ?? '')
  const paymentsCondition = projectQuery?.data?.project_status === 'not_approved'

  const tabs = useMemo(() => {
    if (!projectQuery.data) return []
    return [
      { id: 1, text: `Proyecto`, isSelected: projectView === 'project', action: () => setprojectView('project') },
      {
        id: 2,
        text: `Freelancers`,
        isSelected: projectView === 'freelancer',
        isTabHidden: freelancerCondition,
        action: () => setprojectView('freelancer'),
      },
      {
        id: 3,
        text: `Calculadora`,
        isSelected: projectView === 'calculator',
        isTabHidden: calculatorCondition,
        action: () => setprojectView('calculator'),
      },
      {
        id: 4,
        text: `Historial pagos`,
        isSelected: projectView === 'payment_record',
        isTabHidden: paymentsCondition,
        action: () => setprojectView('payment_record'),
      },
    ]
  }, [projectQuery.data, projectView])

  function refetchProject() {
    projectQuery.refetch()
  }

  const setGoBackPath = () => {
    if (props.asClient) return `${routes.cpanel.clients.findie}/${params.clientId}/proyectos`
    return `${routes.cpanel.projects.list}`
  }

  const setInputDefaultProps = (param: TInputProps) => {
    return {
      name: param.name,
      label: param.label ?? '',
      className: param.className ?? '',
      inputProps: {
        className: `w-full ${param.inputClassName ?? ''}`,
        disabled: param.isDisabled
          ? param.isDisabled
          : props.isDisabledFields ||
            projectQuery?.data?.project_status === 'cancelled' ||
            projectQuery?.data?.project_status === 'finished',
        placeholder: param.pholder ?? '',
        type: param.type ?? 'text',
        step: param.step ?? '',
      },
      form: param.form ? param.form : form,
    }
  }

  const defalutProps = {
    clientId: params.clientId,
    isDisabledFields:
      props.isDisabledFields ||
      projectQuery?.data?.project_status === 'cancelled' ||
      projectQuery?.data?.project_status === 'finished',
    project: projectQuery,
    form,
    updateProjectMutation,
    updateProjectPriceMutation,
    stackMutation,
    suspendStackQuery,
    calculatorMutation,
    postPaymentMutation,
    putPaymentMutation,
    deletePaymentMutation,
    finishCancellProjectMutation,
    uf,
    setInputDefaultProps,
  }

  return (
    <>
      {projectQuery.isSuccess && projectQuery.data.project_status === 'in_progress' && (
        <h5 className='text-blue mt-4'>Proyecto en curso</h5>
      )}
      {projectQuery.isSuccess && projectQuery.data.project_status === 'cancelled' && (
        <h5 className='text-red mt-4'>Proyecto cancelado</h5>
      )}
      {projectQuery.isSuccess && projectQuery.data.project_status === 'finished' && (
        <h5 className='text-soft-green mt-4'>Proyecto terminado</h5>
      )}
      <div className='flex justify-between items-center'>
        {projectQuery.isSuccess && <Tabs tabs={tabs} variant='default' />}
        <Box className='flex justify-end mt-6'>
          <Link to={setGoBackPath()} className='body1-medium flex items-center cursor-pointer'>
            <ArrowBackIcon /> Volver
          </Link>
        </Box>
      </div>

      {projectView === 'project' && <ProjectDescription {...defalutProps} />}
      {projectView === 'freelancer' && <Projectfreelancers {...defalutProps} setprojectView={setprojectView} />}
      {projectView === 'calculator' && <ProjectCalculator {...defalutProps} />}
      {projectQuery.isSuccess && projectView === 'payment_record' && <ProjectPayments {...defalutProps} />}

      <ProjectEvaluation {...defalutProps} setprojectView={setprojectView} />
    </>
  )
}

export default Project
