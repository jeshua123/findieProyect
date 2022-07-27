import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const usePlansQuery = (filters: any) => {
  const plansQuery = useQuery([`all_${endpoints.plans}`, filters], () => apiClient.getPlansFiltered(JSON.stringify(filters)), {
    select: (data) => data.data,
  })
  return plansQuery
}

export const usePlanQuery = (id: string) => {
  const planQuery = useQuery(`one_${endpoints.plans}${id}`, () => apiClient.getPlan(id))
  return planQuery
}

export const usePostPlanMutation = () => {
  const mutation = useMutation(apiClient.postPlan)
  useRefreshPlans(mutation)
  return mutation
}

export const usePutPlanMutation = () => {
  const mutation = useMutation(apiClient.putPlan)
  useRefreshPlans(mutation)
  return mutation
}

export const useDeletePlanMutation = () => {
  const mutation = useMutation(apiClient.deletePlan)
  useRefreshPlans(mutation)
  return mutation
}

export const useRefreshPlans = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.plans}`)
  }, [mutation.isSuccess])
}
