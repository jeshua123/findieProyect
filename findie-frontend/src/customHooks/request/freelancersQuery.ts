import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'
import { useSetLoader } from '../useSetLoader'

export const useFreelancersQuery = (filters: any) => {
  const freelancersQuery = useQuery(
    [`all_${endpoints.freelancers}`, filters],
    () => apiClient.getFreelancersFiltered(JSON.stringify(filters)),
    {
      keepPreviousData: false,
      cacheTime: 0,
      select: (data) => {
        return { data: data.data, metadata: data.metadata }
      },
    }
  )
  return freelancersQuery
}

export const usePublicFreelancersQuery = (filters: any) => {
  const freelancersQuery = useQuery(
    [`all_${endpoints.freelancers}`, filters],
    () => apiClient.getPublicFreelancers(JSON.stringify(filters)),
    {
      keepPreviousData: false,
      cacheTime: 0,
      select: (data) => {
        return { data: data.data, metadata: data.metadata }
      },
    }
  )
  return freelancersQuery
}

export const useFreelancersFetch = () => {
  const query = useQueryClient()
  const loader = useSetLoader()

  const freelancers = async (filters: any) => {
    loader.setIsOpen(true)
    const resp = await query.fetchQuery(`fetch_${endpoints.freelancers}`, () =>
      apiClient.getFreelancersFiltered(JSON.stringify(filters))
    )
    loader.setIsOpen(false)
    return resp
  }
  return freelancers
}

export const useFreelancerProfileQuery = (id: string) => {
  const freelancerQuery = useQuery(`one_${endpoints.profile}${id}`, () => apiClient.getFreelancerProfile(id), {
    cacheTime: 0,
    keepPreviousData: false,
  })
  return freelancerQuery
}

export const useFreelancerQuery = (id: string) => {
  const freelancerQuery = useQuery(`one_${endpoints.freelancers}${id}`, () => apiClient.getFreelancer(id), {
    cacheTime: 0,
    keepPreviousData: false,
  })
  return freelancerQuery
}

export const usePostFreelancerMutation = () => {
  const mutation = useMutation(apiClient.postFreelancer)
  return mutation
}

export const usePutFreelancerMutation = (refresh?: 'refresh') => {
  const mutation = useMutation(apiClient.putFreelancer)
  refresh && useRefreshFreelancers(mutation)
  return mutation
}

export const useHandleFeatureFreelancerMutation = () => {
  const mutation = useMutation(apiClient.handleFeatureFreelancer)
  return mutation
}

export const useDragAndDropFreelancerMutation = () => {
  const mutation = useMutation(apiClient.dragAndDropFreelancer)
  return mutation
}

export const usePutPortfolioFilesMutation = () => {
  const mutation = useMutation(apiClient.putPortfolioFiles)
  return mutation
}

export const usePortfolioDragAndDropMutation = () => {
  const mutation = useMutation(apiClient.putPortfolioGragAndDrop)
  return mutation
}

export const usePutRemovePortfolioFiles = () => {
  const mutation = useMutation(apiClient.putRemovePortfolioFiles)
  return mutation
}

export const useRemovePortfolioPdf = () => {
  const mutation = useMutation(apiClient.removePortfolioPdf)
  return mutation
}

export const useDeleteFeelancerMutation = (refresh?: 'refresh') => {
  const mutation = useMutation(`delete_${endpoints.freelancers}`, apiClient.deleteFreelancer)
  refresh && useRefreshFreelancers(mutation)
  return mutation
}

export const useRefreshFreelancers = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.skills}`)
  }, [mutation.isSuccess])
}
