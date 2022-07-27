import { IWebSiteSection } from '../../../models/IWebSiteSection'
import { whatWeLookingFor } from '../../../constants/WebSite/AboutUsConstants'

import hapyFace from '../../../assets/images/icons/happy-face-white-icon.svg'
import FindieGifIsotype from '../../../shared/Brand/Isotype/FindieGifIsotype'
import FiButton from '../../../assets/UIkit/FiButton'
import routes from '../../../constants/routes'
import SectionStructure from '../../../layout/WebSite/SectionStructure'

const OurMission: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure id='why_findie'>
      <p className='subtitle2-bold'>NUESTROS IDEALES</p>

      <p className=' subtitle5-regular mt-12 md:w-9/12 w-full'>
        En Findie tenemos las cosas claras. Queremos ayudar a nuestros freelancers. Por eso buscamos lo siguiente:
      </p>

      {whatWeLookingFor.map((iter: string) => {
        return (
          <div key={iter} className={`flex md:flex-row flex-col items-center mt-8`}>
            <img src={hapyFace} alt='feliz' className='block mr-4 md:text-left text-center w-6 h-6' />
            <h5 className='md:text-left text-center'>{iter}</h5>
          </div>
        )
      })}

      <div className='lg:flex hidden mt-8'>
        <FindieGifIsotype variant='default' className='lg:w-52 md:w-48 w-28 lg:h-44 md:h-40 h38' />

        <div className='flex justify-between flex-row-reverse flex-col items-center relative lg:-left-8 left-0 '>
          <p className='buttontext1-medium lg:mt-12 mt-0'>Si esto te hace sentido, únete a nosotros:</p>
          <div className='flex lg:justify-center justify-start lg:flex-row flex-col mb-8'>
            <FiButton
              className={`mt-4 mr-4 border ${props.view.textColor.includes('text-black') ? 'border-black' : 'border-white'}`}
              asLink
              to={routes.web_site.freelancer_suscription_form.step_zero}
              variant='outlined'
              theme='secondary'
            >
              <p className={`buttontext1-medium ${props.view.textColor}`}>Postula como freelancer</p>
            </FiButton>
            <FiButton
              className={`mt-4 ${props.view.textColor.includes('text-black') ? 'bg-black' : 'bg-white'}`}
              asLink
              to={routes.web_site.client_suscription_form.step_zero}
            >
              <p className={`buttontext1-medium ${props.view.textColor2}`}>Encuentra a un freelancer</p>
            </FiButton>
          </div>
        </div>
      </div>

      <div className='flex lg:flex-row flex-col mt-8 lg:hidden block'>
        <div className='flex'>
          <FindieGifIsotype variant='default' className='lg:w-52 md:w-48 w-28 lg:h-44 md:h-40 h38 relative lg:leftt-0 -left-8' />
          <p className='buttontext1-medium lg:mt-12 mt-0 md:hidden block self-center relative -left-8'>
            Si esto te hace sentido, únete a nosotros:
          </p>
        </div>

        <div className='flex justify-between flex-row-reverse flex-col lg:items-center relative lg:-left-8 left-0 '>
          <p className='buttontext1-medium lg:mt-12 mt-0 md:block hidden'>Si esto te hace sentido, únete a nosotros:</p>
          <div className='flex lg:justify-center justify-start lg:flex-row flex-col mb-8 lg:w-full md:w-9/12'>
            <FiButton
              className={`mt-4 mr-4 border w-full ${
                props.view.textColor.includes('text-black') ? 'border-black' : 'border-white'
              }`}
              asLink
              to={routes.web_site.freelancer_suscription_form.step_zero}
              variant='outlined'
              theme='secondary'
            >
              <p className={`buttontext1-medium ${props.view.textColor}`}>Postula como freelancer</p>
            </FiButton>
            <FiButton
              className={`mt-4 w-full ${props.view.textColor.includes('text-black') ? 'bg-black' : 'bg-white'}`}
              asLink
              to={routes.web_site.client_suscription_form.step_zero}
            >
              <p className={`buttontext1-medium ${props.view.textColor2}`}>Encuentra a un freelancer</p>
            </FiButton>
          </div>
        </div>
      </div>
    </SectionStructure>
  )
}

export default OurMission
