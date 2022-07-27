import { useState } from 'react'

const usePagination = () => {
  const [page, setPage] = useState(1)

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return { page, handlePage }
}

export default usePagination
