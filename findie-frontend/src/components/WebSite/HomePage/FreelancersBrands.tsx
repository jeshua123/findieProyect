import { IWebSiteSection } from '../../../models/IWebSiteSection'

import SectionStructure from '../../../layout/WebSite/SectionStructure'

import brand1 from '../../../assets/images/web/home-page/brand-1.png'
import brand2 from '../../../assets/images/web/home-page/brand-2.png'
import brand3 from '../../../assets/images/web/home-page/brand-3.png'
import brand4 from '../../../assets/images/web/home-page/brand-4.png'
import brand5 from '../../../assets/images/web/home-page/brand-5.png'

const brandStyle = 'subtitle4-regular text-gray-400 mt-4'

const FreelancersBrands: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure id='freelancers_brands'>
      <h5 className={`${props.view.textColor} mb-8`}>Marcas que han trabajado con nuestros freelancers</h5>

      <p className={brandStyle}>Ministerio de las Culturas, las Artes y el Patrimonio / IBM </p>
      <p className={brandStyle}>Domestika / ICOM / Unesco / Santander </p>
      <p className={brandStyle}>Falabella / Principal Group / Disney</p>
      <p className={brandStyle}>Revista Paula / Sodimac / Fisher Price</p>
      <p className={brandStyle}>Enel X / Banco de Crédito e Inversiones / BICE</p>
      <p className={brandStyle}>Broota.com / BUPA / Universidad del Desarrollo</p>

      <p className='microcopy mt-8'>* Información recogida en base a los CV de nuestros freelancers.</p>

      {/* <div className='slider mt-8 hide-scroll-bar items-center'>
        <img src={brand1} alt='marca1' className='slider-item mr-16' />
        <img src={brand2} alt='marca2' className='slider-item mr-16 h-12' />
        <img src={brand3} alt='marca3' className='slider-item mr-16 h-14' />
        <img src={brand4} alt='marca4' className='slider-item mr-16 h-12' />
        <img src={brand5} alt='marca4' className='slider-item mr-16 h-14' />
      </div> */}
    </SectionStructure>
  )
}

export default FreelancersBrands
