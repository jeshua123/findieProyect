import { IWebSiteSection } from '../../../models/IWebSiteSection'
import { awards } from '../../../constants/WebSite/OurFreelancersConstants'
import routes from '../../../constants/routes'

import CategoriesToForm from '../../../shared/CategoriesToForm/CategoriesToForm'

const FreelancersAwards: React.FC<IWebSiteSection> = (props) => {
  return (
    <div className={`py-24 lg:px-0 md:px-12 px-0`} id='freelancer_awards'>
      <div className={`lg:px-0 md:px-12 px-7`}>
        <p className={`subtitle2-bold md:text-right text-left ${props.view.textColor}`}>PROGRAMA DE PREMIOS</p>
        <p className={`subtitle5-regular mt-12 ${props.view.textColor}`}>
          <strong>¿Conoces a alguien que podría ser un súper freelancer o cliente para Findie?</strong> ¡Invítalos a unirse! Por
          cada 3 freelancers o 1 cliente que sean aceptados y terminen su primer proyecto, tú serás recompensado de la siguiente
          forma:
        </p>
      </div>

      <div className='grid grid-cols-12 gap-2 mt-12'>
        {awards.map((award, index) => {
          return (
            <div key={award.title + index} className={`${award.className} flex flex-col-reverse justify-between p-4 `}>
              <p className='subtitle5-regular text-center'>{award.body}</p>
              <img alt={award.image} className={`block mx-auto my-2 md:w-32 md:h-24 w-24 h-16 ${award.image}`} />
              <h5 className='text-center'>{award.title}</h5>
            </div>
          )
        })}
      </div>
      <p className='microcopy mt-4 lg:px-0 md:px-12 px-7'>*tendrá una duración de 7 días naturales.</p>

      <CategoriesToForm
        title='Conoce aquí las categorías a postular'
        path={routes.web_site.freelancer_suscription_form.step_zero}
      />
    </div>
  )
}

export default FreelancersAwards
