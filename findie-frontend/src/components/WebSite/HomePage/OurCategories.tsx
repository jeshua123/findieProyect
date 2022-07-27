import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IWebSiteSection } from '../../../models/IWebSiteSection'
import { CategoriesContext } from '../../../context/Cpanel/CategoriesContext'
import { ICategory } from '../../../models/ICategory'
import routes from '../../../constants/routes'

import SectionStructure from '../../../layout/WebSite/SectionStructure'

const OurCategories: React.FC<IWebSiteSection> = (props) => {
  const { categoriesQuery } = useContext(CategoriesContext)
  const categories = useMemo(() => {
    if (categoriesQuery.isSuccess) {
      return categoriesQuery.data.filter((category: ICategory) => !category.is_other_category && category.is_available)
    }
    return []
  }, [categoriesQuery.data])

  return (
    <SectionStructure id='our_categories'>
      <p className={`subtitle2-bold md:text-right text-left ${props.view.textColor}`}>NUESTRAS CATEGORÍAS</p>

      <div className='mt-12 md:w-7/12 w-full'>
        {categories.map((category: ICategory) => {
          return (
            <Link
              key={category._id}
              to={`${routes.web_site.freelancers_profiles}/${category._id}`}
              className='h-12 mt-4 border-b border-black flex items-center hover:bg-black hover:text-white md:pl-6 pl-0 transition-all duration-200 ease-in-out'
            >
              <p className='subtitle1-medium'>{category.name}</p>
            </Link>
          )
        })}
      </div>
    </SectionStructure>
  )
}

export default OurCategories
