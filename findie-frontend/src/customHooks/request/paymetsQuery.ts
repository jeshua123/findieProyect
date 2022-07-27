import { useQuery, useMutation } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const usePaymentsQuery = (filter: any) => {
  const paymentsQuery = useQuery(`all_${endpoints.payments}`, () => apiClient.getPaymentsFiltered(JSON.stringify(filter)), {
    select: (data) => data.data,
  })
  return paymentsQuery
}

export const usePaymentQuery = (id: string) => {
  const paymentQuery = useQuery(`one_${endpoints.payments}${id}`, () => apiClient.getPayment(id))
  return paymentQuery
}

export const usePostPaymentMutation = () => {
  const mutation = useMutation(apiClient.postPayment)
  return mutation
}

export const usePutPaymentMutation = () => {
  const mutation = useMutation(apiClient.putPayment)
  return mutation
}

export const useDeletePaymentMutation = () => {
  const mutation = useMutation(apiClient.deletePayment)
  return mutation
}
