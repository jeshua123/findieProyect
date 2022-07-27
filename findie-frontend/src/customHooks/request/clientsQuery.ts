import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useClientsQuery = (filters: any) => {
  const clientsQuery = useQuery(
    [`all_${endpoints.clients}`, filters],
    () => apiClient.getClientsFiltered(JSON.stringify(filters)),
    {
      cacheTime: 0,
      select: (data) => {
        return { data: data.data, metadata: data.metadata }
      },
    }
  )
  return clientsQuery
}

export const useClientQuery = (id: string) => {
  const clientQuery = useQuery(`one_${endpoints.clients}`, () => apiClient.getClient(id), {
    cacheTime: 0,
  })
  return clientQuery
}

export const usePostClientMutation = () => {
  const mutation = useMutation(`post_${endpoints.clients}`, apiClient.postClient)
  return mutation
}

export const usePostClientProjectMutation = () => {
  const mutation = useMutation(`post_${endpoints.clientsProject}`, apiClient.postClientProject)
  return mutation
}

export const usePutClientMutation = (refresh?: 'refresh') => {
  const mutation = useMutation(`put_${endpoints.clients}`, apiClient.putClient)
  refresh && useRefreshClients(mutation)
  return mutation
}

export const useDeleteClientMutation = (refresh?: 'refresh') => {
  const mutation = useMutation(`delete_${endpoints.clients}`, apiClient.deleteClient)
  refresh && useRefreshClients(mutation)
  return mutation
}

export const useRefreshClients = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.clients}`)
  }, [mutation.isSuccess])
}
