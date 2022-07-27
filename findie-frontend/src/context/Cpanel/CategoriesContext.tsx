import { createContext } from 'react'
import { UseQueryResult } from 'react-query'
import { ICategory } from '../../models/ICategory'
import { useCategoriesQuery } from '../../customHooks/request/categoriesQuery'

type TCategoriesContextProps = {
  categoriesQuery: UseQueryResult<ICategory[], unknown>
}
const CategoriesContext: React.Context<TCategoriesContextProps> = createContext<TCategoriesContextProps>({
  categoriesQuery: null!,
})

const CategoriesContextProvider: React.FC = (props) => {
  const categoriesQuery = useCategoriesQuery()

  return <CategoriesContext.Provider value={{ categoriesQuery }}>{props.children}</CategoriesContext.Provider>
}

export { CategoriesContext, CategoriesContextProvider }
