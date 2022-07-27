import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useCategoriesQuery = () => {
  return useQuery(`all_${endpoints.categories}`, apiClient.getCategories, {
    select: (data) => data.data,
  })
}

export const useCategoryQuery = (id: string) => {
  return useQuery(`one_${endpoints.categories}`, () => apiClient.getCategory(id))
}

export const usePostCategoryMutation = () => {
  const mutation = useMutation(`post_${endpoints.categories}`, apiClient.postCategory)
  useRefreshCategories(mutation)
  return mutation
}

export const usePutCategoryMutation = () => {
  const mutation = useMutation(`put_${endpoints.categories}`, apiClient.putCategory)
  useRefreshCategories(mutation)
  return mutation
}

export const useDeleteCategoryMutation = () => {
  const mutation = useMutation(`delete_${endpoints.categories}`, apiClient.deleteCategory)
  useRefreshCategories(mutation)
  return mutation
}

export const useRefreshCategories = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.categories}`)
  }, [mutation.isSuccess])
}
