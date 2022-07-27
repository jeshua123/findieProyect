import { useEffect, useRef, useState } from 'react'
import {
  IExperience,
  IFreelancer,
  IPorfolioFileDetail,
  IPortfolioFile,
  IPortfolioImage,
  IStudy,
} from '../../../models/IFreelancer'
import { ISkill } from '../../../models/ISkill'
import { Link } from 'react-router-dom'
import routes from '../../../constants/routes'

import { Chip, Collapse } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import FiButton from '../../../assets/UIkit/FiButton'
import { getFirstWord } from '../../../utils/helpers'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'
import FindieIsotype from '../../../shared/Brand/Isotype/FindieIsotype'

type TFreelancerProfileInfo = {
  freelancer: IFreelancer
}

const FreelancerProfileInfo: React.FC<TFreelancerProfileInfo> = (props) => {
  const studiesRef = useRef<HTMLDivElement | null>(null)
  const [isRenderSeeMoreButton, setIsRenderSeeMoreButton] = useState<boolean>(false)
  const [shouldRenderMore, setShouldRenderMore] = useState<boolean>(false)
  const hasXdExperience = props.freelancer.experiences.length > 0
  const hasStudies = props.freelancer.studies.length > 0
  const hasPortfolioFiles = props.freelancer.portfolio_files.length > 0
  const hasStudiesAndXdExperience = hasXdExperience || hasStudies

  useEffect(() => {
    setIsRenderSeeMoreButton(!!((studiesRef?.current?.getBoundingClientRect().height ?? 0) >= 495))
  }, [])

  return (
    <>
      <Link to={`${routes.web_site.freelancers_profiles}/${props.freelancer.category._id}`}>
        <h3 className='pb-2 border-b border-black'>{props.freelancer.category.name}</h3>
      </Link>

      <div className='grid grid-cols-12 mt-8 gap-4'>
        <div className='lg:col-span-3 md:col-span-4 col-span-12 flex justify-between'>
          <img src={props.freelancer.avatar.url} alt='avatar' className='md:w-52 md:h-48 w-32 h-28' />
          {props.freelancer.is_available_to_work ? (
            <p className='microcopy text-blue md:hidden block'>Disponible ●</p>
          ) : (
            <p className='microcopy text-red md:hidden block'>No disponible ●</p>
          )}
        </div>

        <div className='lg:col-span-9 md:col-span-8 col-span-12 lg:pl-8 md:pl-2 pl-0'>
          <div className='flex justify-between '>
            <p className='subtitle4-medium'>
              {props.freelancer.name} {props.freelancer.lastName.slice(0, 1).toLocaleUpperCase()}.
            </p>
            {props.freelancer.is_available_to_work ? (
              <p className='microcopy text-blue md:block hidden'>Disponible ●</p>
            ) : (
              <p className='microcopy text-red md:block hidden'>No disponible ●</p>
            )}
          </div>
          <div className='flex  items-center'>
            <p className='microcopy mr-3'>
              {props.freelancer.college_degree} 📍 {props.freelancer.address.city}, {props.freelancer.address.country}
            </p>
            {props.freelancer.featured_status.has_feartued_icon && <FindieIsotype variant='degrade' />}
          </div>
          <p className='body2-medium mt-8'>{props.freelancer.biography}</p>
        </div>

        <div className='lg:col-span-3 col-span-12 lg:mt-4 md:-mt-12 mt-2 md:order-1 order-2'>
          <FiButton variant='outlined' asLink to={`${routes.web_site.client_suscription_form.index}/${props.freelancer._id}`}>
            <span className='subtitle6-medium'>Contrata a {getFirstWord(props.freelancer.name)}</span>
          </FiButton>
        </div>

        <div className='lg:col-span-9 col-span-10 flex flex-wrap mt-4 md:order-2 order-1 lg:pl-8 md:pl-2 pl-0'>
          {props.freelancer.skills.map((skill: ISkill) => {
            return (
              <Chip
                key={skill._id}
                label={<p className='microcopy'>{skill.name}</p>}
                variant='outlined'
                color='primary'
                className='h-6 mr-1 mt-1'
              />
            )
          })}
        </div>
      </div>

      <Collapse in={shouldRenderMore} collapsedSize={hasStudiesAndXdExperience ? '500px' : '0px'}>
        <div ref={studiesRef} className='grid grid-cols-12 mt-12 md:gap-8 gap-0'>
          <div className='md:col-span-4 col-span-12'>
            {hasXdExperience && <p className='subtitle6-medium'>XP destacadas</p>}

            {props.freelancer.experiences
              .sort((a, b) => a.position - b.position)
              .map((experience: IExperience, index: number) => {
                return (
                  <div key={experience.description + index} className='mt-8'>
                    <p className='body2-medium flex items-center'>
                      {experience.rol}{' '}
                      {experience.link && (
                        <a href={experience.link} target='_blank'>
                          <FiIcons className='ml-2 w-4 mb-1' name='link' />
                        </a>
                      )}
                    </p>
                    <p className='body2-regular'>{experience.description}</p>
                  </div>
                )
              })}
          </div>

          <div className='md:col-span-8 col-span-12'>
            {hasStudies && <p className='subtitle6-medium md:ml-8 ml-0 md:mt-0 mt-8'>Educación formal y no formal</p>}

            {props.freelancer.studies
              .sort((a, b) => a.position - b.position)
              .map((study: IStudy, index: number) => {
                return (
                  <div key={study.institution + index} className='mt-8 flex md:ml-8 ml-0'>
                    <p className='body2-medium mr-4 md:block hidden'>●</p>
                    <div className=''>
                      <p className='body2-regular'>{study.institution}</p>
                      <p className='body2-medium'>{study.degree}</p>
                      <p className='body2-regular'>{study.description}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </Collapse>

      {hasStudiesAndXdExperience && isRenderSeeMoreButton && (
        <div
          className='flex justify-end items-center cursor-pointer mt-6'
          onClick={() => setShouldRenderMore((prev: boolean) => !prev)}
        >
          {shouldRenderMore ? (
            <HighlightOffIcon className='text-gray-400 mr-1' />
          ) : (
            <AddCircleOutlineIcon className='text-blue mr-1' />
          )}
          <p className={`body2-medium ${shouldRenderMore ? 'text-gray-400' : 'text-blue'}`}>
            {shouldRenderMore ? 'Ver menos' : 'Ver más'}
          </p>
        </div>
      )}
      {props.freelancer.portfolio_video && (
        <div>
          <p className='subtitle4-medium mt-8'>Portafolio</p>
          <iframe
            className='w-full mt-4 h-600-to-unset'
            src={props.freelancer.portfolio_video}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      )}

      {hasPortfolioFiles && (
        <>
          <p className='subtitle4-medium'>Portafolio</p>
          <div className='grid grid-cols-12 gap-2'>
            {['a', 'b', 'c'].map((column: string) => {
              return (
                <div className='col-span-4'>
                  {props.freelancer.portfolio_files
                    .filter((portfolio: IPortfolioFile) => portfolio.column === column)
                    .map((portfolio: IPortfolioFile) => {
                      return (
                        <div key={portfolio.column}>
                          {portfolio.files
                            .sort((a, b) => a.position - b.position)
                            .map((file: IPorfolioFileDetail) => {
                              return (
                                <div key={file.position} className='relative'>
                                  {file.link ? (
                                    <iframe
                                      className='h-64 w-full mt-2'
                                      src={file.link}
                                      frameBorder='0'
                                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                      allowFullScreen
                                    />
                                  ) : (
                                    <img src={file.url} alt={file.name} className='w-full mt-2' />
                                  )}
                                </div>
                              )
                            })}
                        </div>
                      )
                    })}
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className='total-center'>
        <FiButton
          className='mt-12 py-2 px-4'
          asLink
          to={`${routes.web_site.client_suscription_form.index}/${props.freelancer._id}`}
        >
          <span className='subtitle1-medium'>Contrata a {getFirstWord(props.freelancer.name)}</span>
        </FiButton>
      </div>
    </>
  )
}

export default FreelancerProfileInfo
