import { IWebSiteSection } from '../../../models/IWebSiteSection'

import SectionStructure from '../../../layout/WebSite/SectionStructure'
import Arrow from '../../../assets/UIkit/Arrow'

const AboutUsIntro: React.FC<IWebSiteSection & { executeScroll: (e: string) => void }> = (props) => {
  return (
    <SectionStructure className='relative' id='about_us_intro'>
      <div className='about-us-degrade'>
        <div className='lg:w-6/12 md:w-10/12 w-full'>
          <h1>Findie nace a partir de lo que nos trajo el 2020...</h1>
          <p className='subtitle5-regular mt-6'>
            {'Un año difícil, que en gran parte detuvo nuestros desarrollos y quebró nuestros sueños :('}
          </p>
          <div
            className={`lg:mt-8 md:mt-56 mt-28 cursor-pointer ${props.view.textColor}`}
            onClick={() => props.executeScroll('freelancer')}
          >
            <span className='buttontext3-bold text-left mr-4 md:inline block'>NUESTROS IDEALES</span>
            <Arrow direction='horizontal' className='md:inline block' />
          </div>
        </div>
      </div>
    </SectionStructure>
  )
}

export default AboutUsIntro
