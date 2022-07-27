import { Link } from 'react-router-dom'
import routes from '../../../constants/routes'

import FormContainer from '../../../shared/FormContainer/FormContainer'
import FiButton from '../../../assets/UIkit/FiButton'
import FindieGifIsotype from '../../../shared/Brand/Isotype/FindieGifIsotype'
import degrade from '../../../assets/images/web/Forms/freelancer-form.png'

const FreelancerStepZero: React.FC = () => {
  return (
    <FormContainer background={degrade}>
      <div className='2xl:w-1/2 md:w-8/12 w-11/12 text-center mb-4'>
        <Link to={routes.web_site.home} className='flex justify-center'>
          <FindieGifIsotype className='xl:w-32 lg:w-32 md:w-28 w-16' />
        </Link>
        <h1 className='formtext3-medium lg:pt-20 md:pt-14 pt-8 md:w-9/12 w-11/12 mx-auto'>
          Postula acá para formar parte <br /> de nuestra comunidad de expertos
        </h1>
        <h4 className='mt-2 md:px-0 px-6'>
          Findie busca profesionales que dominan y aman lo que hacen:
          <span className='italic'> Are you our next sudamerican idol?</span>
        </h4>
        <FiButton
          theme='secondary'
          className='lg:my-14 md:my-9 my-6 block py-1.5 px-16 inline-block bg-yellow'
          asLink
          to={`${routes.web_site.freelancer_suscription_form.form_steps}/1`}
        >
          <span className='buttontext4-medium text-black'>¡Lo soy!</span>
        </FiButton>
        <p className='microcopy 2xl:1/4 lg:w-2/5 md:w-9/12 w-11/12 mx-auto'>
          Al enviar este formulario afirmas que has leído y aceptado nuestros{' '}
          <Link to={routes.web_site.terms_conditions}>Términos y condiciones</Link> , y{' '}
          <Link to={routes.web_site.terms_conditions}>Políticas de privacidad.</Link>
        </p>
      </div>
      <p className='microcopy absolute bottom-4 text-center lg:mb-6 md:mb-24 mb-0 w-full'>® Findie SpA 2022</p>
    </FormContainer>
  )
}

export default FreelancerStepZero
