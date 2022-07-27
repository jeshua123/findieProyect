import { useContext } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'
import { CurrentViewContext } from '../../context/WebSite/CurrentViewContext'
import { IFreelancer } from '../../models/IFreelancer'

import FindieIsotype from '../Brand/Isotype/FindieIsotype'

type TProfilesFreelancerCard = {
  freelancer: IFreelancer
}

const ProfilesFreelancerCard: React.FC<TProfilesFreelancerCard> = (props) => {
  const { view } = useContext(CurrentViewContext)

  return (
    <Link to={`${routes.web_site.freelancer_profile}/${props.freelancer._id}`}>
      <div className='relative cursor-pointer lg:w-48 md:w-48 w-28'>
        <div className=' relative lg:h-48 md:h-48 h-28 md:mx-0 mx-auto'>
          <img src={props.freelancer.avatar.url} alt='avatar' className='w-full h-full' />
          {props.freelancer.featured_status.has_feartued_icon && (
            <FindieIsotype variant='degrade' className='absolute bottom-1' />
          )}
        </div>
        <p className={`subtitle3-22 mt-4 ${view.textColor}`}>
          {props.freelancer.name} {props.freelancer.lastName.slice(0, 1).toLocaleUpperCase()}.
        </p>
        <p className={`body2-regular ${view.textColor}`}>{props.freelancer.college_degree}</p>
      </div>
    </Link>
  )
}

export default ProfilesFreelancerCard
