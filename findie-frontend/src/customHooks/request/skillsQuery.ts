import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useSkillsQuery = (filters: { category: string }) => {
  const skillsQuery = useQuery(
    [`all_${endpoints.skills}`, filters],
    () => apiClient.getSkillsByCategory(JSON.stringify(filters)),
    {
      select: (data) => data.data,
      keepPreviousData: false,
      cacheTime: 0,
    }
  )
  return skillsQuery
}

export const useSkillQuery = (id: string) => {
  const skillQuery = useQuery(`one_${endpoints.skills}`, () => apiClient.getSkill(id))
  return skillQuery
}

export const usePostSkillMutation = () => {
  const mutation = useMutation(`post_${endpoints.skill}`, apiClient.postSkill)
  return mutation
}

export const usePutSkillMutation = () => {
  const mutation = useMutation(`put_${endpoints.skill}`, apiClient.putSkill)
  return mutation
}

export const useDeleteSkillMutation = () => {
  const mutation = useMutation(`delete_${endpoints.skill}`, apiClient.deleteSkill)
  return mutation
}

export const useRefreshSkills = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.skill}`)
  }, [mutation.isSuccess])
}
