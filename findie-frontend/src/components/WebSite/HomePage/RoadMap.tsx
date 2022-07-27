import { roadMap } from '../../../constants/WebSite/HomePageConstants'
import { IWebSiteSection } from '../../../models/IWebSiteSection'
import { Link } from 'react-router-dom'
import routes from '../../../constants/routes'

import SectionStructure from '../../../layout/WebSite/SectionStructure'

import Arrow from '../../../assets/UIkit/Arrow'
import circle from '../../../assets/images/web/home-page/grad-border.png'

const RoadMap: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure id='roadmap'>
      <p className={`subtitle2-bold ${props.view.textColor}`}>ESTÁS A TRES PASOS</p>
      <p className={`subtitle5-regular mt-8 mb-24 ${props.view.textColor}`}>
        Como cliente, encontrar y trabajar con un freelancer en Findie es simple: pasa menos tiempo buscando y más tiempo
        desarrollando tus ideas y proyectos.
      </p>

      {roadMap.map((iter, i) => {
        return (
          <div key={iter.title} className='grid grid-cols-12 mt-8 hover:spiner'>
            <div className='md:col-span-4 col-span-12'>
              <div className='relative md:w-24 md:h-24 w-16 h-16 block mx-auto mb-4'>
                <img src={circle} alt='border' className='w-full h-full' />
                <h4 className={`text-center absolute md:top-6 top-4 left-0 right-0 bottom-0 ${props.view.textColor}`}>
                  {iter.step}
                </h4>
              </div>
              {iter.isNotLastStep && <Arrow direction='vertical' className='mx-auto md:block hidden' />}
            </div>
            <div className='md:col-span-8 col-span-12'>
              <p className={`subtitle1-medium md:text-left text-center ${props.view.textColor}`}>{iter.title}</p>
              <p className={`body2-regular mt-2 md:text-left text-center ${props.view.textColor}`}>{iter.content}</p>
              {i === roadMap.length - 1 && (
                <Link to={routes.web_site.faqs}>
                  <p className={`microcopy mt-8 ${props.view.textColor}`}>*más información en FAQs</p>
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </SectionStructure>
  )
}

export default RoadMap
