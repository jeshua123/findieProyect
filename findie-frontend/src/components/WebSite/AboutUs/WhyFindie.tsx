import SectionStructure from '../../../layout/WebSite/SectionStructure'
import { IWebSiteSection } from '../../../models/IWebSiteSection'

const WhyFindie: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure id='why_findie'>
      <p className='subtitle2-bold'>DE DÓNDE NACE EL NOMBRE</p>

      <h3 className='mt-16'>
        {'{Find}'}: <span className='h3 sg-family-regular'>Encontrar, descubrir.</span>
      </h3>

      <h3 className='my-8'>+</h3>

      <h3 className=''>
        {'{Indie}'}: <span className='h3 sg-family-regular'>Del género de música indie | independiente.</span>
      </h3>

      <h3 className='my-8'>=</h3>

      <h3>{'Encuentra a trabajadores independientes (online).'}</h3>
    </SectionStructure>
  )
}

export default WhyFindie
