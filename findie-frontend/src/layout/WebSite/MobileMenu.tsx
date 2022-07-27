import useAuth from '../../customHooks/useAuth'
import routes from '../../constants/routes'
import { TView } from '../../context/WebSite/CurrentViewContext'
import { Link } from 'react-router-dom'

import { IconButton } from '@material-ui/core'
import FiButton from '../../assets/UIkit/FiButton'
import FindieLogo from '../../shared/Brand/Logo/FindieLogo'
import CloseIcon from '@material-ui/icons/Close'

type TMobileMenu = {
  view: TView
  toogleComponent: () => void
  animation: { [key: string]: string }
  togleAnimation: () => void
}

const MobileMenu: React.FC<TMobileMenu> = (props) => {
  const auth = useAuth()
  const hireButtonStyles = props.view.textColor.includes('text-black') ? 'bg-black' : 'bg-white'
  const postButtonStyles = props.view.textColor.includes('text-black') ? 'border border-black' : 'border border-white'

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 z-30 ${props.view.bgColor}`}
      onAnimationEnd={props.togleAnimation}
      style={props.animation}
    >
      <div className='flex justify-between'>
        <Link to={routes.web_site.home} className='absolute md:top-8 md:left-8 top-7 left-7' onClick={props.toogleComponent}>
          <FindieLogo
            className='lg:w-40 lg:h-11 md:w-36 md:h-10 w-20 h-5'
            color={`${props.view.textColor.includes('black') ? 'black' : 'white'}`}
          />
        </Link>
        <IconButton className={`absolute md:top-6 md:right-6 top-2 right-2`} onClick={props.toogleComponent}>
          <CloseIcon fontSize='large' className={`${props.view.textColor}`} />
        </IconButton>
      </div>

      <div className='md:mt-56 mt-36 md:pl-'>
        <Link to={routes.web_site.about_us}>
          <p
            className={`buttontext1-medium ws-family-medium text-center block md:mt-12 mt-8 ${props.view.textColor}`}
            onClick={props.toogleComponent}
          >
            Sobre Findie
          </p>
        </Link>
        <Link to={routes.web_site.how_works}>
          <p
            className={`buttontext1-medium ws-family-medium text-center block md:mt-12 mt-8 ${props.view.textColor}`}
            onClick={props.toogleComponent}
          >
            Cómo funciona
          </p>
        </Link>
        <Link to={routes.web_site.our_freelancers}>
          <p
            className={`buttontext1-medium ws-family-medium text-center block md:mt-12 mt-8 ${props.view.textColor}`}
            onClick={props.toogleComponent}
          >
            Freelancers
          </p>
        </Link>
        <Link to={routes.web_site.our_clients}>
          <p
            className={`buttontext1-medium ws-family-medium text-center block md:mt-12 mt-8 ${props.view.textColor}`}
            onClick={props.toogleComponent}
          >
            Clientes
          </p>
        </Link>
      </div>

      <div className='absolute w-full md:bottom-28 bottom-16 total-center flex-col'>
        <FiButton
          className={`mt-4 px-16 ${props.view.textColor} ${postButtonStyles}`}
          variant='outlined'
          theme='secondary'
          asLink
          to={routes.web_site.freelancer_suscription_form.step_zero}
        >
          Postula
        </FiButton>
        <FiButton
          className={`mt-4 px-16 ${props.view.textColor2} ${hireButtonStyles}`}
          asLink
          to={routes.web_site.client_suscription_form.step_zero}
        >
          Contrata
        </FiButton>
        {auth.isLogged ? (
          <FiButton className={`mt-4 px-16 ${props.view.textColor}`} variant='default' onClick={auth.logout}>
            Cerrar sesión
          </FiButton>
        ) : (
          <FiButton className={`mt-4 px-16 ${props.view.textColor}`} variant='default' asLink to={routes.auth.login}>
            Iniciar sesión
          </FiButton>
        )}
      </div>
    </div>
  )
}

export default MobileMenu
