import { useQuery, useMutation } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'

export const useBlogsQuery = () => {
  const blogsQuery = useQuery(`all_${endpoints.blogs}`, apiClient.getBlogs, {
    select: (data) => data.data,
  })
  return blogsQuery
}

export const useBlogQuery = (email: string) => {
  const blogQuery = useQuery(`one_${endpoints.blogs}${email}`, () => apiClient.getBlog(email))
  return blogQuery
}

export const usePostBlogMutation = () => {
  const mutation = useMutation(apiClient.postBlog)
  return mutation
}
