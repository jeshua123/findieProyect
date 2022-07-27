import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { IUseFormSteps } from '../models/IFormStep'
import { ICategory } from '../models/ICategory'

const useFormSteps = (props: IUseFormSteps) => {
  const { slide } = useParams<{ slide: string }>()
  const storage = props.storage
  const formDefaultValue = { [props.name]: storage.item[props.name] ?? '' }
  const form = useForm({ defaultValues: formDefaultValue })
  const input = form.watch(props.name)

  useEffect(() => {
    if (slide !== props.currentStep) return
    if (!input) return props.setIsButtonDisabled(true)

    if (props.asCategories) {
      const categorySelected =
        props.categoriesQuery?.isSuccess && props.categoriesQuery.data.find((category: ICategory) => category._id === input)
      storage.setItem({ createdAt: new Date().getTime(), [props.name]: input, categorySelected })
      props.setIsButtonDisabled(false)
      return
    }
    storage.setItem({ ...storage.item, [props.name]: input })
    props.setIsButtonDisabled(!input)
  }, [input, slide])

  useEffect(() => {
    form.reset(formDefaultValue)
  }, [storage.item.category])

  useEffect(() => {
    if (!input) return

    props.setIsButtonDisabled(false)
    if (storage.item?.categorySelected?.is_other_category) {
      if (!form.watch('proposed_options.category')) return props.setIsButtonDisabled(true)

      storage.setItem({ ...storage.item, proposed_options: { category: form.watch('proposed_options.category') } })
      props.setIsButtonDisabled(false)
    }
  }, [storage.item?.categorySelected?.is_other_category, form.watch('proposed_options.category')])

  return { form, storage }
}

export default useFormSteps
