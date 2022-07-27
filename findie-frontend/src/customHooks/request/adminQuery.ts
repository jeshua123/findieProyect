import { useQuery, useMutation } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useAdminsQuery = () => {
  const adminsQuery = useQuery(`all_${endpoints.admins}`, apiClient.getAdmins, {
    select: (data) => data.data,
  })
  return adminsQuery
}

export const useAdminQuery = (id: string) => {
  const adminQuery = useQuery(`one_${endpoints.admins}${id}`, () => apiClient.getAdmin(id))
  return adminQuery
}

export const usePostAdminMutation = () => {
  const mutation = useMutation(apiClient.postAdmin)
  return mutation
}

export const usePutAdminMutation = () => {
  const mutation = useMutation(apiClient.putAdmin)
  return mutation
}

export const useDeleteAdminMutation = () => {
  const mutation = useMutation(apiClient.deleteAdmin)
  return mutation
}
