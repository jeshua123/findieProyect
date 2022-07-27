import { useContext } from 'react'
import ProfilesFreelancerCard from '../../../shared/ProfilesFreelancerCard/ProfilesFreelancerCard'
import {
  audiovisualExpertise1,
  audiovisualExpertise2,
  audiovisualExpertise3,
  audiovisualExpertise4,
  audiovisualExpertise5,
  designExpertise1,
  designExpertise2,
  designExpertise3,
  designExpertise4,
  developExpertise1,
  developExpertise2,
  developExpertise3,
  writingExpertise1,
  writingExpertise2,
  writingExpertise3,
  writingExpertise4,
} from '../../../constants/WebSite/FreelancersProfilesConstants'
import { CategoriesContext } from '../../../context/Cpanel/CategoriesContext'
import { ICategory } from '../../../models/ICategory'
import { IFreelancer } from '../../../models/IFreelancer'
import useExecuteScroll from '../../../customHooks/useExecuteScroll'
import { UseQueryResult } from 'react-query'
import { IMetadata } from '../../../models/IMetadata'

import FiButton from '../../../assets/UIkit/FiButton'
import routes from '../../../constants/routes'
import FindieIsotype from '../../../shared/Brand/Isotype/FindieIsotype'

type TFreelancersProfilesList = {
  profiles: UseQueryResult<{ data: IFreelancer[]; metadata: IMetadata }, unknown>
  categorySelected: string
  setCategorySelected: React.Dispatch<React.SetStateAction<string>>
}

const FreelancersProfilesList: React.FC<TFreelancersProfilesList> = (props) => {
  const { categoriesQuery } = useContext(CategoriesContext)
  const scroll = useExecuteScroll()
  const currentCategory =
    categoriesQuery.isSuccess && categoriesQuery.data.find((category: ICategory) => category._id === props.categorySelected)

  const setCategory = (categoryId: string) => {
    props.setCategorySelected(categoryId)
    scroll.execute()
  }

  return (
    <div ref={scroll.elementRef}>
      <h3 className='pb-2 border-b border-black'>{currentCategory && currentCategory.name}</h3>

      {
        <div className='flex items-center justify-end mt-8'>
          <FindieIsotype variant='degrade' className='mr-2' />
          <p className='microcopy'>: destacados de la semana </p>
        </div>
      }

      <div className='pt-8 pb-16 border-b-8 border-gray-100'>
        <div className='grid grid-cols-12 gap-4 md:px-4 px-0'>
          {props.profiles.isSuccess &&
            props.profiles.data.data
              .sort((a, b) => a.featured_status.position - b.featured_status.position)
              .map((freelancer: IFreelancer) => {
                return (
                  <div key={freelancer._id} className='lg:col-span-3 md:col-span-4 col-span-6 flex justify-center'>
                    <ProfilesFreelancerCard freelancer={freelancer} />
                  </div>
                )
              })}
        </div>
        {props.profiles.isSuccess && props.profiles.data.data.length > 16 && (
          <div className='total-center flex-col relative z-10 lg:w-1/2 w-5/6 py-12 -mt-96 mx-auto bg-white-04 lg:px-12 px-4 rounded-md'>
            <h4 className='text-center'>Para ver más perfiles</h4>
            <div className='mt-8'>
              <FiButton
                className='block mx-auto px-4'
                variant='contained'
                theme='secondary'
                asLink
                to={routes.web_site.client_suscription_form.step_zero}
              >
                Haz click acá
              </FiButton>
            </div>
          </div>
        )}
      </div>

      {/* design */}
      {currentCategory && currentCategory._id === '6168109e817121146f4b149b' && (
        <div className='mt-16'>
          <p className='subtitle6-medium'>Áreas de expertiz</p>

          <div className='grid grid-cols-12 md:gap-x-12 gap-x-0'>
            <div className='md:col-span-3 col-span-12'>
              {designExpertise1.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-3 col-span-12'>
              {designExpertise2.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-3 col-span-12'>
              {designExpertise3.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-3 col-span-12'>
              {designExpertise4.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      {/* develop */}
      {currentCategory && currentCategory._id === '616810b4817121146f4b14a1' && (
        <div className='mt-16'>
          <p className='subtitle6-medium'>Áreas de expertiz</p>

          <div className='grid grid-cols-12 md:gap-x-12 gap-x-0'>
            <div className='md:col-span-4 col-span-12'>
              {developExpertise1.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-4 col-span-12'>
              {developExpertise2.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-4 col-span-12'>
              {developExpertise3.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      {/* Writing */}
      {currentCategory && currentCategory._id === '616810d8817121146f4b14ad' && (
        <div className='mt-16'>
          <p className='subtitle6-medium'>Áreas de expertiz</p>

          <div className='grid grid-cols-12 md:gap-x-12 gap-x-0'>
            <div className='md:col-span-4 col-span-12'>
              {writingExpertise1.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-4 col-span-12'>
              {writingExpertise3.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
              {writingExpertise4.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-4 col-span-12'>
              {writingExpertise2.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      {/* audivisual */}
      {currentCategory && currentCategory._id === '616810cd817121146f4b14a7' && (
        <div className='mt-16'>
          <p className='subtitle6-medium'>Áreas de expertiz</p>

          <div className='grid grid-cols-12 md:gap-x-12 gap-x-0'>
            <div className='md:col-span-4 col-span-12'>
              {audiovisualExpertise2.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-4 col-span-12'>
              {audiovisualExpertise3.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className='md:col-span-4 col-span-12'>
              {audiovisualExpertise4.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
              {audiovisualExpertise5.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
              {audiovisualExpertise1.map((iter, index) => {
                return (
                  <div key={iter.area + index} className='mt-4'>
                    <p className='body2-medium'>{iter.area}</p>
                    {iter.expertises.map((expertise, index) => {
                      return (
                        <p key={expertise + index} className='microcopy'>
                          {expertise}
                        </p>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div>
        <p className='formtext2-regular text-center mt-16'>¿Necesitas formar un equipo para tu proyecto?</p>
        <p className='formtext2-regular text-center'>Busca aquí freelancers de otras áreas</p>

        <div className='flex justify-center md:flex-row flex-col'>
          {categoriesQuery.isSuccess &&
            categoriesQuery.data
              .filter(
                (category: ICategory) =>
                  category._id !== props.categorySelected && !category.is_other_category && category.is_available
              )
              .map((category: ICategory) => {
                return (
                  <FiButton
                    key={category._id}
                    theme='primary'
                    variant='outlined'
                    className='mx-4 mt-4'
                    onClick={() => setCategory(category._id)}
                  >
                    {category.name}
                  </FiButton>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default FreelancersProfilesList
