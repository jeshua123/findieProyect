import SectionStructure from '../../../layout/WebSite/SectionStructure'
import { IWebSiteSection } from '../../../models/IWebSiteSection'

const HowWorksIntro: React.FC<IWebSiteSection & { executeScroll: (e: string) => void }> = (props) => {
  return (
    <SectionStructure className='relative' id='about_us_intro'>
      <div className='how-works-degrade'>
        <div className={`lg:w-6/12 md:w-10/12 w-full ${props.view.textColor}`}>
          <h1>Aplicamos un proceso de selección riguroso.</h1>
          <p className='subtitle5-regular mt-6'>
            En Findie nos esforzamos por asegurar la calidad y seguridad, tanto para nuestros freelancers como para nuestros
            clientes.
          </p>
          <div className={`lg:mt-8 md:mt-52 mt-20 flex items-center ${props.view.textColor}`}>
            <span
              className='buttontext2-semibold text-left mr-4 cursor-pointer mt-3'
              onClick={() => props.executeScroll('freelancer')}
            >
              FREELANCERS
            </span>
            <span className='mx-8 font-thin text-5xl'>/</span>
            <span
              className='buttontext2-semibold text-left cursor-pointer ml-4 mt-3'
              onClick={() => props.executeScroll('client')}
            >
              CLIENTES
            </span>
          </div>
        </div>
      </div>
    </SectionStructure>
  )
}

export default HowWorksIntro
