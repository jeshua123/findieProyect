import { useContext } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'
import { CurrentViewContext } from '../../context/WebSite/CurrentViewContext'
import { IFreelancer } from '../../models/IFreelancer'
import { ISkill } from '../../models/ISkill'

type THomeFreelancerCard = {
  freelancer: IFreelancer
}

const HomeFreelancerCard: React.FC<THomeFreelancerCard> = (props) => {
  const { view } = useContext(CurrentViewContext)
  const skills = props.freelancer.skills.slice(0, 4)
  const borderCHip = view.textColor.includes('text-black') ? 'border border-black' : 'border border-white'

  return (
    <Link to={`${routes.web_site.freelancer_profile}/${props.freelancer._id}`} className='block'>
      <div className='grid grid-cols-12 col-span-6 xl:w-64 lg:w-60 md:w-56 w-36 w-full md:gap-0 gap-4 px-4 mx-auto'>
        <div className='md:col-span-12 col-span-6 xl:w-64 lg:w-60 md:w-56 w-36 lg:h-60 md:h-52 h-36'>
          <img src={props.freelancer.avatar.url} alt='avatar' className='w-full h-full' />
        </div>

        <div className='md:col-span-12 col-span-6'>
          <p className={`subtitle3-22 md:mt-8 mt-0 ${view.textColor}`}>
            {props.freelancer.name} {props.freelancer.lastName.slice(0, 1).toLocaleUpperCase()}.
          </p>
          <p className={`body2-regular ${view.textColor}`}>{props.freelancer.college_degree}</p>
          <div className='flex flex-wrap mt-3'>
            {skills.map((skill: ISkill) => {
              return (
                <span key={skill._id} className={`microcopy rounded-2xl px-2 mr-1 mt-1 ${borderCHip} ${view.textColor}`}>
                  {skill.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HomeFreelancerCard
