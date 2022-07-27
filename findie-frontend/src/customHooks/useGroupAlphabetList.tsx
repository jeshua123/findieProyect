import { useMemo } from 'react'
import { UseQueryResult } from 'react-query'
import { IMetadata } from '../models/IMetadata'
import { removeAccents } from '../utils/helpers'

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'Ñ',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

function useGroupAlphabetList<T>(query: UseQueryResult<{ data: T[]; metadata: IMetadata }, unknown>) {
  const freelancers = useMemo(() => {
    if (!query.isSuccess) return []

    return alphabet.map((letter: string) => {
      const list = query.data.data.filter((freelancer: any) =>
        removeAccents(freelancer.name.trim()).toLowerCase().startsWith(letter.toLowerCase())
      )
      return {
        letter,
        list,
      }
    })
  }, [query.isFetching])

  return freelancers
}

export default useGroupAlphabetList
