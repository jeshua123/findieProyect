import { IWebSiteSection } from '../../../models/IWebSiteSection'

import SectionStructure from '../../../layout/WebSite/SectionStructure'

import Arrow from '../../../assets/UIkit/Arrow'
import routes from '../../../constants/routes'
import { Link } from 'react-router-dom'

const HomePageIntro: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure className='relative' id='home_page_intro'>
      <div className='home-degrade'>
        <div className='lg:w-6/12 md:w-10/12 w-full'>
          <h1>El lugar para encontrar profesionales expertos.</h1>
          <p className='subtitle5-regular mt-6'>
            Findie es una comunidad selecta de freelancers on-demand para traer soluciones efectivas a tu negocio. Forma parte del
            cambio.
          </p>
        </div>

        <div className={`lg:mt-8 md:mt-52 mt-28 flex items-center ${props.view.textColor}`}>
          <Link to={routes.web_site.freelancer_suscription_form.step_zero}>
            <span className='buttontext3-bold text-left md:mr-4 mr-2 cursor-pointer'>POSTULA ACÁ</span>
          </Link>
          <span className='md:mx-6 mx-0 font-thin text-5xl'>/</span>
          <Link to={routes.web_site.client_suscription_form.step_zero}>
            <span className='buttontext3-bold text-left cursor-pointer md:ml-4 ml-2 mr-12'>CONTRATA ACÁ</span>
          </Link>
          <Arrow direction='horizontal' className='md:block hidden' />
        </div>
        <Arrow direction='horizontal' className='md:hidden block mt-2' />
      </div>
    </SectionStructure>
  )
}

export default HomePageIntro
