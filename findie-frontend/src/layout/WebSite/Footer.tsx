import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'
import { usePostBlogMutation } from '../../customHooks/request/blogsQuery'
import { IBlog } from '../../models/IBlog'

import FindieGifIsotype from '../../shared/Brand/Isotype/FindieGifIsotype'
import WebSiteStructure from './WebSiteStructure'

const Footer: React.FC = () => {
  const form = useForm()
  const email = usePostBlogMutation()
  const [emailMessage, setEmailMessage] = useState<string>('')

  const createEmail = () => {
    if (!form.watch('email')) return setEmailMessage('Agrega un email!!')

    const body: Partial<IBlog> = { email: form.watch('email'), createdAt: new Date().getTime() }
    email.mutate(body, {
      onSuccess: () => {
        setEmailMessage('Envío existoso :-)')
        setTimeout(() => {
          form.reset()
        }, 4000)
      },
      onError: (err: any) => setEmailMessage(err.json.error),
    })
  }

  useEffect(() => {
    setEmailMessage('')
  }, [form.watch('email')])

  return (
    <WebSiteStructure className='relative bg-black md:py-24 py-14 lg:px-0 md:px-12 px-8 z-20'>
      <div className='grid grid-cols-12'>
        <div className='md:col-span-8 col-span-12 order-1'>
          <p className='buttontext2-regular text-white'>INSCRÍBETE</p>
          <p className='buttontext2-regular text-white'>{'Para recibir las últimas novedades ;-)'}</p>

          <form>
            <div className='grid grid-cols-12 border border-white rounded-3xl px-4 h-9 mt-8 md:w-9/12 w-full'>
              <input
                className='lg:col-span-10 col-span-9 buttontext2-regular border-none focus:outline-none bg-transparent text-white'
                placeholder='E-mail'
                {...form.register('email')}
              />
              <div
                className='lg:col-span-2 col-span-3 total-center h-full border-l border-white cursor-pointer'
                onClick={createEmail}
              >
                <span className={`buttontext3-medium ml-2 text-white`}>Enviar</span>
              </div>
            </div>
            <p className={`microcopy ml-8 ${email.isSuccess ? 'text-white' : 'text-red'}`}>{emailMessage}</p>
          </form>
        </div>

        <div className='md:col-span-4 col-span-12 md:mt-0 mt-12 flex md:justify-end justify-center md:order-2 order-6'>
          <FindieGifIsotype variant='contained-white' className='md:w-40 md:h-36 w-20 h-20' />
        </div>

        <div className='md:col-span-4 col-span-5 md:mt-20 mt-16 order-3'>
          <p className='buttontext3-bold text-white'>Sobre Findie</p>
          <Link to={routes.web_site.about_us} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            Quiénes somos
          </Link>
          <Link to={routes.web_site.how_works} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            Cómo funciona
          </Link>
          <Link to={routes.web_site.our_freelancers} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            Freelancers
          </Link>
          <Link to={routes.web_site.our_clients} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            Clientes
          </Link>
        </div>

        <div className='lg:col-span-4 md:col-span-5 col-span-7 md:mt-20 mt-16 text-white order-4'>
          <p className='buttontext3-bold'>Ayuda</p>
          <Link to={routes.web_site.faqs} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            FAQ
          </Link>
          <Link to={routes.web_site.terms_conditions} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            Términos y condiciones
          </Link>
          <Link to={routes.web_site.terms_conditions} className='buttontext2-regular block text-white hover:italic-style mt-4'>
            Políticas de privacidad
          </Link>
        </div>

        <div className='lg:col-span-4 md:col-span-3 col-span-12 text-white md:mt-20 mt-8 flex md:flex-col flex-row md:justify-end justify-between order-5'>
          <p className='buttontext3-bold text-white text-right md:block hidden'>Siguenos</p>
          <a
            href='https://www.linkedin.com/company/findieonline/'
            className='buttontext2-regular text-white block hover:italic-style mt-4 md:text-right text-left'
          >
            LinkedIn
          </a>
          <a
            href='https://instagram.com/findie.insta/'
            className='buttontext2-regular text-white block hover:italic-style mt-4 md:text-right text-left'
          >
            Instagram
          </a>
          <a
            href='https://open.spotify.com/user/kyg7yipjennf1fj2bpn67aeyf?si=661e7f6de4ed433e'
            className='buttontext2-regular text-white block hover:italic-style mt-4 md:text-right text-left'
          >
            Spotify
          </a>
        </div>

        <div className='lg:col-span-6 col-span-12 md:col-span-5 md:mt-20 mt-16 md:order-5 order-6'>
          <p className='microcopy text-white md:text-left text-center'>Copyright © Findie SpA 2022</p>
        </div>

        <div className='lg:col-span-6 col-span-12 md:col-span-7 md:mt-20 mt-4 md:order-6 order-7'>
          <p className='microcopy text-white md:text-right text-center'>Ebro 2740 Of. 602, Las Condes, Santiago - Chile.</p>
        </div>
      </div>
    </WebSiteStructure>
  )
}

export default Footer
