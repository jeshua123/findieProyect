import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import Slider from 'react-slick'
import routes from '../../constants/routes'

import { IconButton } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import FindieGifIsotype from '../Brand/Isotype/FindieGifIsotype'

type TWizard = {
  isButtonDisabled?: boolean
  className?: string
  theme?: 'blue' | 'light-orange'
  route?: string
  withRoutes?: boolean
  onChangeNextSlide?: () => void
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
  vertical: true,
  cssEase: 'ease-in',
  draggable: false,
  verticalSwiping: true,
  swipe: false,
}

const Wizard: React.FC<TWizard> = (props: PropsWithChildren<any>) => {
  const history = useHistory()
  const params = useParams<{ slide: string }>()
  const slider1 = useRef<any>()

  const handleStep = (action: 'next' | 'prev') => {
    if (action.includes('prev')) {
      props.withRoutes ? history.push(`${props.route}/${Number(params.slide) - 1}`) : slider1.current.slickPrev()
    }
    if (action.includes('next')) {
      props.withRoutes ? history.push(`${props.route}/${Number(params.slide) + 1}`) : slider1.current.slickNext()
    }
  }

  useEffect(() => {
    if (params.slide) {
      slider1.current.slickGoTo(Number(params.slide) - 1)
    }
  }, [params.slide])

  return (
    <div className={`wizard-grid ${props.className} ${props.setTheme().containerBgColor}`}>
      <div className='relative md:order-1 order-2'>
        <Slider ref={(slider) => (slider1.current = slider)} {...settings}>
          {props.children}
        </Slider>

        <div className='absolute bottom-8  lg:right-8 rigth-0 md:ml-16 ml-8'>
          {params.slide !== '1' && (
            <IconButton
              onClick={() => handleStep('prev')}
              size='small'
              className={`outline-black mr-4 ${props.setTheme().buttonBgColor}`}
            >
              <KeyboardArrowUpIcon className='text-black' />
            </IconButton>
          )}
          {+params.slide !== props.children.length && (
            <IconButton
              onClick={() => handleStep('next')}
              size='small'
              disabled={props.isButtonDisabled}
              className={`outline-black  ${props.isButtonDisabled ? 'bg-white-gray' : props.setTheme().buttonBgColor}`}
            >
              <KeyboardArrowDownIcon className='text-black' />
            </IconButton>
          )}
        </div>
      </div>

      <div className='flex justify-center md:items-end items-center md:order-2 order-1 bg-white md:pb-16 pb-0'>
        <Link to={routes.web_site.home}>
          <FindieGifIsotype className='lg:w-28 md:w-24 w-16' />
        </Link>
      </div>
    </div>
  )
}
export default Wizard
