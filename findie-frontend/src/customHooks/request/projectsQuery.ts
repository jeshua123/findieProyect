import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useProjectsQuery = (filters: any) => {
  const projectsQuery = useQuery(
    [`all_${endpoints.projects}`, filters],
    () => apiClient.getProjectsFiltered(JSON.stringify(filters)),
    {
      keepPreviousData: false,
      cacheTime: 0,
      select: (data) => {
        return { data: data.data, metadata: data.metadata }
      },
    }
  )
  return projectsQuery
}

export const useProjectQuery = (id: string) => {
  const projectQuery = useQuery(`one_${endpoints.projects}${id}`, () => apiClient.getProject(id), {
    keepPreviousData: false,
    cacheTime: 0,
  })
  return projectQuery
}

export const useUFQuery = () => {
  return useQuery(`uf`, apiClient.getUF, { select: (data) => data.serie[0].valor })
}

export const usePostProjectMutation = () => {
  const mutation = useMutation(apiClient.postProject)
  return mutation
}

export const usePutProjectMutation = () => {
  const mutation = useMutation(apiClient.putProject)
  return mutation
}

export const useFinishCancellProjectMutation = () => {
  const mutation = useMutation(apiClient.finishCancellProject)
  return mutation
}

export const usePutProjectPriceMutation = () => {
  const mutation = useMutation(apiClient.putUpdateProjectPrice)
  return mutation
}

export const useSuspendStackMutation = () => {
  const mutation = useMutation(apiClient.suspendStack)
  return mutation
}

export const useFreelancerStackMutation = () => {
  const mutation = useMutation(apiClient.putFreelancerStack)
  return mutation
}

export const useUpdateWithCalculatorMutation = () => {
  const mutation = useMutation(apiClient.updateWithCalculator)
  return mutation
}

export const useDeleteProjectMutation = (refresh?: 'refresh_all' | 'refresh_one') => {
  const mutation = useMutation(apiClient.deleteProject)
  refresh === 'refresh_all' && useRefreshProjects(mutation)
  return mutation
}

export const useRefreshProjects = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.fetchQuery(`all_${endpoints.projects}`)
  }, [mutation.isSuccess])
}

export const useRefreshProject = (id: string) => {
  const queryClient = useQueryClient()

  const refreshProject = () => {
    queryClient.fetchQuery(`fetch_${endpoints.projects}`, () => apiClient.getProject(id), {
      cacheTime: 0,
    })
  }
  return { refreshProject }
}
