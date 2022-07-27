import { useContext } from 'react'
import { CurrentViewContext } from '../../context/WebSite/CurrentViewContext'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'
import useAnimation from '../../customHooks/useAnimation'

import FindieLogo from '../../shared/Brand/Logo/FindieLogo'
import MobileMenu from './MobileMenu'

import { IconButton } from '@material-ui/core'
import FiButton from '../../assets/UIkit/FiButton'
import MenuIcon from '@material-ui/icons/Menu'
import useAuth from '../../customHooks/useAuth'

const LateralMenu: React.FC = () => {
  const { view } = useContext(CurrentViewContext)
  const auth = useAuth()
  const { isComponentOpen, animation, toogleComponent, togleAnimation } = useAnimation()

  return (
    <>
      <Link to={routes.web_site.home} className='fixed lg:top-11 lg:left-11 md:top-8 md:left-8 top-7 left-7'>
        <FindieLogo
          className='lg:w-32 lg:h-8 md:w-28 md:h-7 w-20 h-5'
          color={`${view.textColor.includes('text-black') ? 'black' : 'white'}`}
        />
      </Link>

      <span className={`buttontext2-regular rotated-text mr-20 mb-2  ${view.textColor}`}>
        Encuentra y trabaja con freelancers expertos, online. ®
      </span>

      <div className='fixed lg:flex hidden justify-end flex-col top-11 right-11'>
        {auth.isLogged && auth.userLogged?.user_type.includes('admin') && (
          <Link to={routes.cpanel.freelancers.register} className='flex justify-end mt-4'>
            <p className={`buttontext2-medium cursor-pointer text-right text-blue hover:italic-style ${view.textColor}`}>
              Backoffice
            </p>
          </Link>
        )}
        <Link to={routes.web_site.our_freelancers}>
          <p className={`buttontext2-medium cursor-pointer text-right mt-4 hover:italic-style ${view.textColor}`}>Freelancers</p>
        </Link>
        <Link to={routes.web_site.our_clients}>
          <p className={`buttontext2-medium cursor-pointer text-right mt-4 hover:italic-style ${view.textColor}`}>Clientes</p>
        </Link>
        <FiButton
          className={`mt-4 py-0 border ${view.textColor.includes('text-black') ? 'border-black' : 'border-white'}`}
          variant='outlined'
          theme='secondary'
          asLink
          to={routes.web_site.freelancer_suscription_form.step_zero}
        >
          <p className={`buttontext2-semibold ${view.textColor}`} style={{ marginBottom: 1 }}>
            Postula
          </p>
        </FiButton>
        <FiButton
          asLink
          to={routes.web_site.client_suscription_form.index}
          className={`mt-4 py-0 ${view.textColor.includes('text-black') ? 'bg-black' : 'bg-white'}`}
        >
          <p className={`buttontext2-semibold ${view.textColor2}`} style={{ marginBottom: 1 }}>
            Contrata
          </p>
        </FiButton>
      </div>

      <IconButton className={`fixed md:top-6 md:right-6 top-2 right-2 lg:hidden block`} onClick={toogleComponent}>
        <MenuIcon fontSize='large' className={`${view.textColor}`} />
      </IconButton>

      <div className='fixed lg:flex hidden justify-end flex-col bottom-16 right-11'>
        {auth.isLogged ? (
          <p
            className={`buttontext2-semibold cursor-pointer text-right hover:italic-style ${view.textColor}`}
            onClick={auth.logout}
          >
            Cerrar sesión
          </p>
        ) : (
          <Link to={routes.auth.login}>
            <p className={`buttontext2-semibold cursor-pointer text-right hover:italic-style ${view.textColor}`}>
              Iniciar sesión
            </p>
          </Link>
        )}

        {/* <p className={`buttontext2-regular cursor-pointer text-right mt-4 hover:italic-style ${view.textColor}`}>Board</p> */}
        <Link to={routes.web_site.faqs}>
          <p className={`buttontext2-regular cursor-pointer text-right mt-4 hover:italic-style ${view.textColor}`}>FAQs</p>
        </Link>
      </div>

      {isComponentOpen && (
        <MobileMenu view={view} toogleComponent={toogleComponent} animation={animation} togleAnimation={togleAnimation} />
      )}
    </>
  )
}

export default LateralMenu
