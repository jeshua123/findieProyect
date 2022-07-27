import { useContext } from 'react'
import { CategoriesContext } from '../context/Cpanel/CategoriesContext'

const useCategories = () => {
  const { categoriesQuery } = useContext(CategoriesContext)
  return categoriesQuery
}

export default useCategories
