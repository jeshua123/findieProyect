import { useContext } from 'react'
import routes from '../../constants/routes'
import { CurrentViewContext } from '../../context/WebSite/CurrentViewContext'
import { Link } from 'react-router-dom'

import WebSiteStructure from './WebSiteStructure'

const Header: React.FC = () => {
  const { view } = useContext(CurrentViewContext)

  return (
    <WebSiteStructure>
      <div className={`flex ${view.textColor}`}>
        <p className='buttontext2-regular md:block hidden lg:ml-0 ml-48'>¡Postulaciones abiertas!</p>
        <Link to={routes.web_site.about_us} className='lg:block hidden mx-11 hover:italic-style'>
          <p className={`buttontext2-medium ${view.textColor}`}>Sobre Findie</p>
        </Link>
        <Link to={routes.web_site.how_works} className='lg:block hidden hover:italic-style'>
          <p className={`buttontext2-medium ${view.textColor}`}>Cómo funciona</p>
        </Link>
      </div>
    </WebSiteStructure>
  )
}

export default Header
