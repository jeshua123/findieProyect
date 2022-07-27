import { Link } from 'react-router-dom'
import { IWebSiteSection } from '../../../models/IWebSiteSection'

import Arrow from '../../../assets/UIkit/Arrow'
import SectionStructure from '../../../layout/WebSite/SectionStructure'
import routes from '../../../constants/routes'

const OurFreelancersIntro: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure className='relative' id='our_freelancers_intro'>
      <div className='freelancers-degrade'>
        <div className='lg:w-6/12 md:w-10/12 w-full'>
          <h1 className={`${props.view.textColor}`}>Únete a una comunidad selecta de freelancers.</h1>
          <p className={`subtitle5-regular mt-6 ${props.view.textColor}`}>
            Findie busca profesionales que dominan y aman hacer lo que hacen. Queremos encontrar profesionales que compartan
            nuestros mismos ideales.
          </p>
          <Link to={routes.web_site.freelancer_suscription_form.step_zero}>
            <div className={`lg:mt-8 md:mt-48 mt-20 ${props.view.textColor}`}>
              <span className='buttontext3-bold text-left mr-4 md:inline block'>POSTULA ACÁ</span>
              <Arrow direction='horizontal' className='md:inline block' />
            </div>
          </Link>
        </div>
      </div>
    </SectionStructure>
  )
}

export default OurFreelancersIntro
