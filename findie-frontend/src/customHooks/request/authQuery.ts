import { useMutation } from 'react-query'
import { apiClient } from '../../utils/ApiClient'

export const useLoginMutation = () => {
  const mutation = useMutation(apiClient.login)
  return mutation
}
