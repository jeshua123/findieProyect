import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../../../customHooks/useAuth'
import useSwitchOnOff from '../../../customHooks/useSwitchOnOff'
import { IUser, TAvatarStyle } from '../../../models/IUser'
import { usePutAdminMutation } from '../../../customHooks/request/adminQuery'
import useRequestAlert from '../../../customHooks/useRequestAlert'

import CpanelAvatar from '../../../shared/CpanelAvatar/CpanelAvatar'

import { Box, Button } from '@material-ui/core'
import InputField from '../../../assets/UIkit/Forms/InputField'

const avatarDots: { bgColor: string; value: TAvatarStyle }[] = [
  { bgColor: 'bg-yellow', value: 'yellow' },
  { bgColor: 'bg-strong-rose', value: 'strong_rose' },
  { bgColor: 'bg-red', value: 'red' },
  { bgColor: 'bg-sea-blue', value: 'sea_blue' },
  { bgColor: 'bg-soft-blue', value: 'soft_blue' },
  { bgColor: 'bg-light-black', value: 'light_black' },
  // { bgColor: 'bg-white', value: 'white' },
]

const AdminProfileInfo: React.FC = () => {
  const { userLogged } = useAuth()
  const switchOnOff = useSwitchOnOff()
  const auth = useAuth()
  const form = useForm({
    defaultValues: {
      name: userLogged?.name ?? '',
      last_name: userLogged?.last_name ?? '',
      email: userLogged?.email ?? '',
      phone: userLogged?.phone ?? '',
      password: '******',
      repeat_password: '******',
    },
  })
  const putAdminMutation = usePutAdminMutation()
  useRequestAlert(putAdminMutation)
  const [selectedAvatar, setSelectedAvatar] = useState<TAvatarStyle>(userLogged?.avatar_style ?? 'sea_blue')
  const formField = form.watch

  const editAdminProfile: SubmitHandler<IUser> = (data) => {
    const body = { ...data, avatar_style: selectedAvatar }
    putAdminMutation.mutate({ body, _id: userLogged?._id ?? '' })
  }

  useEffect(() => {
    if (putAdminMutation.isSuccess) {
      auth.login(putAdminMutation.data)
    }
  }, [putAdminMutation.isSuccess])

  return (
    <form onSubmit={form.handleSubmit(editAdminProfile)}>
      <div className='flex justify-between items center'>
        <p className='microcopy'>Perfíl y cuenta</p>
        {switchOnOff.render()}
      </div>

      <div className='grid grid-cols-12 mt-8 gap-12'>
        <div className='lg:col-span-3 md:col-span-12 flex flex-col justify-center items-center'>
          <CpanelAvatar
            size='large'
            variant={selectedAvatar}
            name={userLogged?.name ?? ''}
            lastName={userLogged?.last_name ?? ''}
          />
          <div className='flex flex-wrap mt-4'>
            {avatarDots.map((dot, index) => {
              return (
                <div
                  key={dot.value + index}
                  className={`${dot.bgColor} ${index === avatarDots.length - 1 ? 'mr-0' : 'mr-2'} w-6 rounded-3xl cursor-pointer`}
                  style={{ height: 21 }}
                  onClick={() => setSelectedAvatar(dot.value)}
                />
              )
            })}
          </div>
        </div>
        <div className='lg:col-span-7 md:col-span-8 grid grid-cols-12 gap-4'>
          <div className='col-span-6'>
            <InputField
              name='name'
              label='Nombre'
              options={{ required: 'Este campo es requerido' }}
              inputProps={{ className: 'w-full', disabled: !switchOnOff.switchState, placeholder: 'Ingresa tu nombre' }}
              form={form}
            />
          </div>
          <div className='col-span-6'>
            <InputField
              name='last_name'
              label='Apellido'
              options={{ required: 'Este campo es requerido' }}
              inputProps={{ className: 'w-full', disabled: !switchOnOff.switchState, placeholder: 'Ingresa tu apellido' }}
              form={form}
            />
          </div>
          <div className='col-span-6'>
            <InputField
              name='email'
              label='Email'
              options={{ required: 'Este campo es requerido' }}
              inputProps={{
                className: 'w-full',
                disabled: userLogged?.user_type === 'admin' ? true : !switchOnOff.switchState,
                placeholder: 'Ingresa tu email',
              }}
              form={form}
            />
          </div>
          <div className='col-span-6'>
            <InputField
              name='phone'
              label='Teléfono'
              options={{ required: 'Este campo es requerido' }}
              inputProps={{ className: 'w-full', disabled: !switchOnOff.switchState, placeholder: 'Ingresa tu telefono' }}
              form={form}
            />
          </div>
          <div className='col-span-6'>
            <InputField
              name='password'
              label='Contraseña'
              inputProps={{
                type: 'password',
                className: 'w-full',
                disabled: !switchOnOff.switchState,
                placeholder: 'Ingresa tu nuva contraseña',
              }}
              options={{
                required: 'Este campo es requerido',
                validate: () => {
                  if (formField('repeat_password') !== formField('password')) {
                    return 'Las contraseñas deben ser iguales'
                  }
                },
              }}
              form={form}
            />
          </div>
          <div className='col-span-6'>
            <InputField
              name='repeat_password'
              label='Confirmar contraseña'
              inputProps={{
                type: 'password',
                className: 'w-full',
                disabled: !switchOnOff.switchState,
                placeholder: 'Conforma tu contraseña',
              }}
              options={{
                required: 'Este campo es requerido',
                validate: () => {
                  if (formField('repeat_password') !== formField('password')) {
                    return 'Las contraseñas deben ser iguales'
                  }
                },
              }}
              form={form}
            />
          </div>
        </div>
      </div>

      <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
        <Button variant='contained' color='primary' type='submit' disabled={!switchOnOff.switchState}>
          Guardar cambios
        </Button>
      </Box>
    </form>
  )
}

export default AdminProfileInfo
