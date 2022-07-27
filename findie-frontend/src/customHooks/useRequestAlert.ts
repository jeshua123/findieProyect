import { useSetLoader } from './useSetLoader'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useSnackbar } from 'notistack'

const useRequestAlert = (
  request: any,
  form?: UseFormReturn<any>,
  actionAfterSuccess?: () => void,
  actionAfterError?: () => void
) => {
  const snackbar = useSnackbar()
  useSetLoader(request)

  useEffect(() => {
    if (request.isError) {
      actionAfterError && actionAfterError()
      snackbar.enqueueSnackbar(request?.error?.json?.error ?? 'Hubo un error. Intentalo nuevamente', { variant: 'error' })
    }
    if (request.isSuccess) {
      form && form.reset()
      actionAfterSuccess && actionAfterSuccess()
      snackbar.enqueueSnackbar('Cambios realizados exitosamente!', { variant: 'success' })
    }
  }, [request.isError, request.isSuccess])
}

export default useRequestAlert
