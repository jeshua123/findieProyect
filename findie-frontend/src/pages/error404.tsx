import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import { useWebSiteLayout } from '../customHooks/useWebSiteLayout'

import error404 from '../assets/images/web/error404-desktop.png'
import WebSiteStructure from '../layout/WebSite/WebSiteStructure'
import SectionStructure from '../layout/WebSite/SectionStructure'

const Error404: React.FC = () => {
  const { view, setView } = useWebSiteLayout()

  useEffect(() => {
    setView({ path: 'error404', bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' })
  }, [])

  return (
    <WebSiteStructure>
      <SectionStructure>
        <div className='grid grid-cols-12 lg:mt-28 md:mt-8 mt-4'>
          <div className='lg:col-span-5 md:col-span-6 col-span-12'>
            <h1>Página no disponible</h1>
            <Link to={routes.web_site.home}>
              <p className='buttontext-2 mt-2 underline'>Volver al inicio</p>
            </Link>
          </div>
          <img src={error404} alt='errror404' className='lg:col-span-5 md:col-span-6 col-span-12' />
        </div>
      </SectionStructure>
    </WebSiteStructure>
  )
}

export default Error404
