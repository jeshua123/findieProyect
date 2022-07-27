import { IWebSiteSection } from '../../../models/IWebSiteSection'

import plantWhite from '../../../assets/images/web/about-us/plant-white.png'
import plantBlack from '../../../assets/images/web/about-us/plant-black.png'
import handWhite from '../../../assets/images/web/about-us/hand-white.png'
import handBlack from '../../../assets/images/web/about-us/hand-black.png'
import flowerWhite from '../../../assets/images/web/about-us/flower-white.png'
import flowerBlack from '../../../assets/images/web/about-us/flower-black.png'

const OurHistory: React.FC<IWebSiteSection> = (props) => {
  const plant = plantWhite
  const hand = handWhite
  const flower = flowerWhite

  return (
    <div className='py-24' id='our_history'>
      <p className={`subtitle2-bold lg:text-right text-left lg:px-40 md:px-16 px-7 ${props.view.textColor}`}>ÉRASE UNA VEZ</p>

      <div className={`grid grid-cols-12 lg:px-40 md:px-12 px-7 ${props.view.textColor}`}>
        <div className='lg:col-span-4 lg:block hidden order-1' />

        <div className='lg:col-span-5 md:col-span-7 col-span-12 lg:order-3 order-2'>
          <p className='body1-medium mt-8'>
            Las fundadoras, ambas freelancers, se encontraban separadas físicamente: una en Chile y la otra en el Viejo Mundo,
            buscando construir sueños y encontrar trabajos que les
            <span className='subtitle1-bold'> permitiera sobrevivir el 2020 y vivir de lo que les apasiona.</span> Sin embargo, lo
            que el mercado les ofrecía eran pocas oportunidades laborales y trabajos que requerían un modelo de trabajador
            multifuncional… dónde era difícil de encajar.
          </p>
        </div>

        <div className='lg:col-span-3 md:col-span-5 col-span-12 lg:order-2 order-3'>
          <img src={plant} alt='planta' className='mt-20 block mr-auto lg:-ml-8 md:ml-0 -ml-4 ' />
        </div>

        <div className='lg:col-span-4 md:col-span-5 md:block hidden lg:order-5 order-4'>
          <img src={hand} alt='mano' className='block ml-auto lg:mr-4 md:mr-0  lg:mt-4 mt-12' />
        </div>

        <div className='lg:col-span-5 md:col-span-7 col-span-12 md:mt-8 lg:order-6 order-5'>
          <p className='body1-medium lg:mt-8 mt-4'>
            Cansadas de lo que el mundo les deparaba decidieron unir sus fuerzas y{' '}
            <span className='subtitle1-bold'>dar vuelta las cosas para ellas y los demás freelancers en Chile:</span> ha llegado
            el momento de cambiar el estilo de trabajo para los freelancers chilenos.
          </p>
        </div>

        <div className='col-span-12 md:hidden block order-6'>
          <img src={hand} alt='mano' className='block mx-auto mt-8' />
        </div>

        <div className='lg:col-span-3 lg:block hidden lg:order-4 order-7' />

        <div className='lg:col-span-4 lg:block hidden lg:order-7 order-8' />

        <div className='lg:col-span-5 md:col-span-7 col-span-12 order-9'>
          <p className='body1-medium lg:mt-4 md:mt-8'>
            Por eso creamos Findie, una plataforma de mercado online para profesionales independientes expertos en Chile.{' '}
            <span className='subtitle1-bold'>
              Un lugar donde se podrá encontrar y contratar a profesionales de calidad, de todos los rincones de nuestro país.
            </span>
          </p>
          <p className='body1-medium mt-4'>Y colorín colorado, este cuento no se ha acabado…</p>
        </div>

        <div className='lg:col-span-3 md:col-span-5 col-span-12 lg:order-8 order-10'>
          <img src={flower} alt='flor' className='block mr-auto lg:mt-16 md:mt-64 mt-16 lg:-ml-12 ml-0' />
        </div>

        <p className='microcopy col-span-12 mr-8 md:text-right text-left lg: mt-16 order-11'>
          Ilustraciones por MÁ., freelancer Findie
        </p>
      </div>
    </div>
  )
}

export default OurHistory
