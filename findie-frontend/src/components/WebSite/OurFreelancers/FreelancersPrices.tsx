import { IWebSiteSection } from '../../../models/IWebSiteSection'
import { usePlansQuery } from '../../../customHooks/request/plansQuery'
import { IPlan } from '../../../models/IPlan'

const FreelancersPrices: React.FC<IWebSiteSection> = (props) => {
  const { data: plansQuery } = usePlansQuery({ entity: 'freelancer', is_available: true, is_secret: false })

  return (
    <div className={`py-24 lg:px-0 md:px-12 px-0`} id='freelancer_price'>
      <div className={`lg:px-0 md:px-12 px-7`}>
        <p className={`subtitle2-bold ${props.view.textColor}`}>¿CUÁLES SON LOS COSTOS?</p>

        <p className={`subtitle5-regular mt-12 ${props.view.textColor}`}>
          ¡Postular es completamente gratuito! Findie funciona a base de comisiones por cada proyecto realizado*. Una vez
          aceptado, automáticamente entrarás con una cuenta Findie independiente, pero luego puedes cambiarte a una membresía
          mensual que tiene un % de comisión menor:
        </p>
      </div>

      <div className='grid grid-cols-12 gap-2 mt-8'>
        {plansQuery &&
          plansQuery.map((plan: IPlan) => {
            return (
              <div key={plan._id} className='lg:col-span-4 col-span-12 grid grid-cols-12'>
                <div className='lg:col-span-12 md:col-span-8 col-span-12 flex lg:flex-col flex-row lg:justify-start justify-between px-6 py-4 bg-white'>
                  <h5 className='text-center lg:block hidden px-14'>{plan.name}</h5>
                  <h5 className='self-center lg:hidden block'>{plan.name}</h5>
                  <h1 className='text-center lg:block hidden'>{plan.fee}%</h1>
                  <h2 className='text-center self-center lg:hidden block'>{plan.fee}%</h2>
                </div>
                <div className='lg:col-span-12 md:col-span-4 col-span-12 px-6 md:py-4 py-2 bg-black flex md:flex-col flex-row justify-center'>
                  <h5 className='text-white text-center md: mr-0 mr-4'>{plan.price === 0 ? '$ 0 CLP' : '$ ***** CLP'}</h5>
                  <h5 className='text-white text-center'>valor mensual</h5>
                </div>
              </div>
            )
          })}
      </div>

      <p className={`mt-4 microcopy ${props.view.textColor} lg:px-0 md:px-12 px-7`}>
        *Mantenimiento de la plataforma, servidor, marketing, compensaciones, área legal, entre otros.
      </p>
    </div>
  )
}

export default FreelancersPrices
