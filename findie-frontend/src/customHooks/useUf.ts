import { useContext } from 'react'
import { UfContext } from '../context/Cpanel/UfContext'

const useUf = () => {
  const { UfQuery } = useContext(UfContext)
  return UfQuery
}

export default useUf
