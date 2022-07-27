import routes from '../../../constants/routes'

import FiButton from '../../../assets/UIkit/FiButton'
import FormContainer from '../../../shared/FormContainer/FormContainer'
import degrade from '../../../assets/images/web/Forms/client-form.png'
import FindieGifIsotype from '../../../shared/Brand/Isotype/FindieGifIsotype'

const ClientStepEight: React.FC = () => {
  return (
    <>
      <FormContainer background={degrade}>
        <div className=' text-center mb-16'>
          <FindieGifIsotype className='xl:w-32 lg:w-32 md:w-28 w-20 mx-auto' />
          <p className='formtext2-regular font-medium text-center lg:pt-14 md:pt-3.5 mt-6'>
            ¡Listo! tu solicitud ha sido <br /> enviada. Prontamente te <br /> contactaremos.
          </p>

          <FiButton
            theme='light'
            className='lg:mt-12 md:mt-9 mt-8 block py-1.5 md:px-16 px-8 inline-block'
            asLink
            to={`${routes.web_site.home}`}
          >
            <p className='buttontext4-medium'>Cerrar</p>
          </FiButton>
        </div>
      </FormContainer>
    </>
  )
}

export default ClientStepEight
