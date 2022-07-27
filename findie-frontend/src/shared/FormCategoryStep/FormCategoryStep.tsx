import { useMemo } from 'react'
import useCategories from '../../customHooks/useCategoriests'
import { ICategory } from '../../models/ICategory'
import { IFormStep } from '../../models/IFormStep'

import FormStepOptionsContent from '../FormStepOptionsContent/FormStepOptionsContent'

const FormCategoryStep: React.FC<IFormStep & { userType: 'client' | 'freelancer' }> = (props) => {
  const categories = useCategories()

  const categoriesList = useMemo(() => {
    if (!categories.isSuccess) return []

    return categories.data
      .filter((category: ICategory) => category.is_available)
      .map((category: ICategory) => {
        return { value: category._id, label: category.name, isOtherCategory: category.is_other_category }
      })
  }, [categories.isSuccess])

  return (
    <>
      <FormStepOptionsContent
        name='category'
        title={props.userType.includes('client') ? '¿Qué tipo de profesional buscas' : '¿En qué área quieres trabajar?'}
        currentStep={props.currentStep}
        options={categoriesList}
        categoriesQuery={categories}
        {...props}
        asCategories
      />
    </>
  )
}

export default FormCategoryStep
