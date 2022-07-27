import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useHistory, useLocation } from 'react-router-dom'
import routes from '../constants/routes'
import { useLoginMutation } from '../customHooks/request/authQuery'
import useAuth from '../customHooks/useAuth'

import FiButton from '../assets/UIkit/FiButton'
import InputField from '../assets/UIkit/Forms/InputField'
import FindieIsotype from '../shared/Brand/Isotype/FindieIsotype'
import { useSetLoader } from '../customHooks/useSetLoader'
import FindieGifIsotype from '../shared/Brand/Isotype/FindieGifIsotype'

interface LocationState {
  from: { pathname: string }
}

const Login: React.FC = () => {
  const location = useLocation<LocationState>()
  const navigate = useHistory().push
  const auth = useAuth()
  const form = useForm()
  const login = useLoginMutation()
  useSetLoader(login)

  const loginUser: SubmitHandler<{ user: string; password: string }> = async (body) => {
    login.mutate(body)
  }

  useEffect(() => {
    if (login.isSuccess) {
      auth.login(login.data)
      const hasPreviusUrl = location?.state?.from?.pathname
      const dispatch = {
        freelancer: () => navigate('/freelanccer'),
        client: () => navigate('/client'),
        admin: () => navigate(routes.cpanel.freelancers.register),
        super_admin: () => navigate(hasPreviusUrl ? hasPreviusUrl : routes.cpanel.freelancers.register),
      }
      login.data?.user_type && dispatch[login.data.user_type]()
    }
  }, [login.isSuccess])

  useEffect(() => {
    login.reset()
  }, [form.watch('email'), form.watch('password')])

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <form className='lg:w-1/3 md:w-4/5 w-full px-4' onSubmit={form.handleSubmit(loginUser)}>
        <Link to={routes.web_site.home}>
          <FindieGifIsotype className='block mx-auto w-28 h-28' />
        </Link>

        <h2 className='mt-12 text-center'>Hola Findie Admin</h2>
        <h4 className='text-center mt-4'>{"Let's make some magic :)"}</h4>

        <div className='h-36'>
          <InputField
            name='email'
            form={form}
            inputProps={{
              className: 'mt-4 border border-gray-300 lg:w-9/12 w-full mx-auto block',
              placeholder: 'Ingresa tu correo',
            }}
          />
          <InputField
            name='password'
            form={form}
            inputProps={{
              type: 'password',
              className: 'mt-4 border border-gray-300 lg:w-9/12 w-full mx-auto block',
              placeholder: 'Ingresa tu contraseña',
            }}
          />
          {login.isError && <p className='body2-medium text-red mt-2 text-center'>El usuario o contraseña son invalidos</p>}
        </div>

        {/* <p className='microcopy text-center'>
          <Link to={routes.auth.forgot_password}>¿Olvidaste tu contraseña?</Link> Welcome to the club: <br /> enviaremos un código
          a tu email para que lo uses <br /> y cambies al entrar en tu nueva sesión.
        </p> */}

        <FiButton type='submit' theme='secondary' variant='outlined' className='block mx-auto px-8'>
          Entrar
        </FiButton>
        <p className='microcopy text-center mt-16'>® Findie SpA 2021</p>
      </form>
    </div>
  )
}

export default Login
