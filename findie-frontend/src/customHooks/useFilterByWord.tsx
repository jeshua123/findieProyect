import { Box, IconButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import InputField from '../assets/UIkit/Forms/InputField'
import SearchIcon from '@material-ui/icons/Search'
import { useForm } from 'react-hook-form'
import useDebounce from './useDebounce'

const useFilterByWord = () => {
  const form = useForm()
  const word = useDebounce(form.watch('word'), 600)

  const renderInput = () => {
    return (
      <InputField
        name='word'
        inputProps={{ className: 'w-full mr-2 border border-gray-300', placeholder: 'Filtrar por nombre' }}
        options={{ required: 'Este campo es requerido' }}
        form={form}
      />
    )
  }

  return { word, renderInput }
}

export default useFilterByWord
