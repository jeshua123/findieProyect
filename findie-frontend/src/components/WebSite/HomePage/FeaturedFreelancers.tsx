import { useState, useEffect, useRef, useMemo } from 'react'
import { useCategoriesQuery } from '../../../customHooks/request/categoriesQuery'
import { ICategory } from '../../../models/ICategory'
import { IFreelancer } from '../../../models/IFreelancer'
import { IWebSiteSection } from '../../../models/IWebSiteSection'
import Slider from 'react-slick'
import { sliderSettings } from '../../../constants/WebSite/HomePageConstants'
import { usePublicFreelancersQuery } from '../../../customHooks/request/freelancersQuery'
import { useMediaQuery } from '@material-ui/core'

import HomeFreelancerCard from '../../../shared/HomeFreelancerCard/HomeFreelancerCard'
import WebSiteStructure from '../../../layout/WebSite/WebSiteStructure'

import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'
import SectionStructure from '../../../layout/WebSite/SectionStructure'

const FeaturedFreelancers: React.FC<IWebSiteSection> = (props) => {
  const sliderRef = useRef<any>()
  const mobile = useMediaQuery('(max-width:430px)')
  const tablet = useMediaQuery('(max-width:800px)')
  const categoriesQuery = useCategoriesQuery()
  const freelancersQuery = usePublicFreelancersQuery({ 'featured_status.is_featured': true })
  const [selectCategory, setSelectCategory] = useState<ICategory>()
  const [freelancers, setFreelancers] = useState<IFreelancer[]>([])
  const border = props.view.textColor.includes('text-black') ? 'border-b border-black' : 'border-b border-white'

  const categories = useMemo(() => {
    if (categoriesQuery.isSuccess) {
      return categoriesQuery.data.filter((category: ICategory) => !category.is_other_category)
    }
    return []
  }, [categoriesQuery.data])

  const showArrowsSlides = () => {
    if (mobile) return 1
    if (tablet) return 2
    return 3
  }

  const handleSlide = (direction: 'prev' | 'next') => {
    direction === 'prev' && sliderRef.current.slickNext()
    direction === 'next' && sliderRef.current.slickPrev()
  }

  useEffect(() => {
    if (categoriesQuery.isSuccess) {
      setSelectCategory(categoriesQuery.data[0])
    }
  }, [categoriesQuery.isSuccess])

  useEffect(() => {
    if (freelancersQuery.isSuccess && selectCategory?._id) {
      const freelancerByCategory = freelancersQuery.data.data
        .filter((freelancer: IFreelancer) => {
          return freelancer.category._id === selectCategory._id
        })
        .sort((a, b) => a.featured_status.position - b.featured_status.position)
      setFreelancers(freelancerByCategory.slice(0, 6))
    }
  }, [freelancersQuery.isSuccess, selectCategory])

  return (
    <div className='py-24' id='featured_freelancers'>
      <WebSiteStructure className='pt-0 pb-0'>
        <SectionStructure>
          <div className='mt-8 lg:w-3/5 md:w-4/5 w-full'>
            <p className={`subtitle2-bold md:block hidden ${props.view.textColor}`}>CONOCE A NUESTROS FREELANCERS</p>
            <p className={`subtitle2-bold md:hidden block ${props.view.textColor}`}>
              CONOCE A NUESTROS <br /> FREELANCERS
            </p>

            <div className='slider mt-8 mb-12 hide-scroll-bar'>
              {categories
                .filter((category: ICategory) => !category.is_other_category && category.is_available)
                .map((category: ICategory) => {
                  const isSelectedStyle = category._id === selectCategory?._id && border
                  return (
                    <p
                      key={category._id}
                      className={`subtitle2-medium slider-item mr-4 pb-3 cursor-pointer ${props.view.textColor} ${isSelectedStyle}`}
                      onClick={() => setSelectCategory(category)}
                    >
                      {category.name}
                    </p>
                  )
                })}
            </div>
          </div>
        </SectionStructure>
      </WebSiteStructure>
      <div className='md:w-5/6 w-full mx-auto relative'>
        <Slider ref={(slider) => (sliderRef.current = slider)} {...sliderSettings(freelancers.length)}>
          {freelancers.map((freelancer: IFreelancer) => {
            return <HomeFreelancerCard key={freelancer._id} freelancer={freelancer} />
          })}
        </Slider>
        {freelancers.length > showArrowsSlides() && (
          <div className='flex justify-between absolute top-1/2 w-full '>
            <FiIcons
              name='chrevron_left'
              className={`${props.view.textColor === 'text-white' ? 'svg-white' : 'svg-black'} ${mobile ? '-ml-1 w-6 h-6' : ''} `}
              onClick={() => handleSlide('next')}
            />
            <FiIcons
              name='chrevron_right'
              className={`${props.view.textColor === 'text-white' ? 'svg-white' : 'svg-black'}  w-6 h-6`}
              onClick={() => handleSlide('prev')}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FeaturedFreelancers
