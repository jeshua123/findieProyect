import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useProjectFeesQuery = () => {
  const projectFeesQuery = useQuery(`all_${endpoints.paymentMethods}`, apiClient.getPaymentMethods, {
    select: (data) => data.data,
  })
  return projectFeesQuery
}

export const useProjectFeeQuery = (id: string) => {
  const projectFeeQuery = useQuery(`one_${endpoints.paymentMethods}`, () => apiClient.getPaymentMethod(id))
  return projectFeeQuery
}

export const usePostProjectFeeMutation = () => {
  const mutation = useMutation(apiClient.postPaymentMethod)
  useRefreshProjectFees(mutation)
  return mutation
}

export const usePutProjectFeeMutation = () => {
  const mutation = useMutation(apiClient.putPaymentMethod)
  useRefreshProjectFees(mutation)
  return mutation
}

export const useDeleteProjectFeeMutation = () => {
  const mutation = useMutation(apiClient.deletePaymentMethod)
  useRefreshProjectFees(mutation)
  return mutation
}

export const useRefreshProjectFees = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.paymentMethods}`)
  }, [mutation.isSuccess])
}
