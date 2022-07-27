import { createContext } from 'react'
import { UseQueryResult } from 'react-query'
import { useUFQuery } from '../../customHooks/request/projectsQuery'

type TUfContextProps = {
  UfQuery: UseQueryResult<any, unknown>
}
const UfContext: React.Context<TUfContextProps> = createContext<TUfContextProps>({
  UfQuery: null!,
})

const UfContextProvider: React.FC = (props) => {
  const UfQuery = useUFQuery()

  return <UfContext.Provider value={{ UfQuery }}>{props.children}</UfContext.Provider>
}

export { UfContext, UfContextProvider }
