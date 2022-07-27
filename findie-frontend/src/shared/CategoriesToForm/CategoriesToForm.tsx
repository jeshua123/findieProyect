import { FC } from 'react'
import FiButton from '../../assets/UIkit/FiButton'
import useCategories from '../../customHooks/useCategoriests'
import { ICategory } from '../../models/ICategory'

type TCategoriesToForm = {
  title: string
  path: string
}

const CategoriesToForm: FC<TCategoriesToForm> = (props) => {
  const categoriesQuery = useCategories()

  return (
    <div className='w-1/2 md:w-full'>
      <p className='formtext2-regular  text-center mt-16'>{props.title}</p>

      <div className='flex flex-wrap justify-between md:w-10/12 w-full mx-auto'>
        {categoriesQuery.isSuccess &&
          categoriesQuery.data
            .filter((category: ICategory) => !category.is_other_category && category.is_available)
            .map((category: ICategory) => {
              return (
                <FiButton key={category._id} theme='primary' variant='outlined' className='mx-4 mt-4 py-0' to={props.path} asLink>
                  {category.name}
                </FiButton>
              )
            })}
      </div>
    </div>
  )
}

export default CategoriesToForm
