import { useEffect, useMemo } from 'react'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import routes from '../../../constants/routes'
import { IFormStep } from '../../../models/IFormStep'
import { Link } from 'react-router-dom'

import FormStepContainer from '../../../shared/FormStepContainer/FormStepContainer'

import FiButton from '../../../assets/UIkit/FiButton'
import InputField from '../../../assets/UIkit/Forms/InputField'
import { usePostFreelancerMutation } from '../../../customHooks/request/freelancersQuery'
import { IFreelancer } from '../../../models/IFreelancer'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import { emailRegex } from '../../../utils/helpers'

const FreelancerStepFour: React.FC<IFormStep> = (props) => {
  const history = useHistory()
  const snackbar = useSnackbar()
  const storage = props.storage
  const freelancerValidation = !storage.item?.category || !storage.item?.skills || !storage.item?.cv?.file_name
  const formDefaultValues = {
    name: storage.item.name ?? '',
    lastName: storage.item.lastName ?? '',
    'address.country': storage.item?.address?.country ?? '',
    phone: storage.item.phone ?? '',
    email: storage.item.email ?? '',
    repeat_email: storage.item.repeat_email ?? '',
  }
  const form = useForm({
    defaultValues: formDefaultValues,
  })
  const freelancerMutation = usePostFreelancerMutation()
  useSetLoader(freelancerMutation)

  const handleColorValidation = (field: 'name' | 'lastName' | 'address.country' | 'phone' | 'email' | 'repeat_email') => {
    return form.watch(field) ? 'freelancer-success-validation' : 'freelancer-error-validation'
  }

  const stepValidation = useMemo(() => {
    return [
      { step: '1', title: 'Paso 1: Categoría del proyecto', storageField: !storage.item?.category },
      {
        step: '2',
        title: 'Paso 2: Habilidades del profesional',
        storageField: !storage.item?.skills,
      },
      {
        step: '3',
        title: 'Paso 3: Documentos',
        storageField: !storage.item?.cv?.file_name,
      },
    ]
  }, [storage.item])

  const createFreelancer: SubmitHandler<IFreelancer> = (freelancer) => {
    const body: IFreelancer = { ...storage.item, freelancer }
    freelancerMutation.mutate(body, {
      onSuccess: () => {
        storage.removeItem()
        props.setFreelancerName && props.setFreelancerName(freelancer.name)
        history.push(routes.web_site.freelancer_suscription_form.step_five)
      },
      onError: (error: any) => {
        snackbar.enqueueSnackbar(error.json.error, { variant: 'error' })
      },
    })
  }

  useEffect(() => {
    let inputFields = storage.item
    Object.entries(form.getValues()).forEach(([key, value]) => {
      inputFields = { ...inputFields, [key]: value }
    })
    storage.setItem(inputFields)
  }, [
    form.watch('name'),
    form.watch('lastName'),
    form.watch('address.country'),
    form.watch('phone'),
    form.watch('email'),
    form.watch('repeat_email'),
  ])

  useEffect(() => {
    form.reset(formDefaultValues)
  }, [storage.item.category])

  if (freelancerValidation) {
    return (
      <FormStepContainer>
        <p className='formtext1-regular text-black'>Los siguientes pasos estan incompletos y son requeridos:</p>

        {stepValidation.map((step) => {
          return (
            <div key={step.title}>
              {step.storageField && (
                <p className='buttontext4-regular text-black md:mt-8 mt-3'>
                  {step.title}
                  <Link to={`${props?.route}/${step.step}`} className='ml-4 text-orange'>
                    Ir al paso
                  </Link>
                </p>
              )}
            </div>
          )
        })}
      </FormStepContainer>
    )
  }

  return (
    <FormStepContainer>
      <p className='formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 md:mb-12 mb-6 text-black'>Rellena tus datos personales:</p>

      <form onSubmit={form.handleSubmit(createFreelancer)}>
        <div className='grid grid-cols-12 gap-4'>
          <div className='md:col-span-6 col-span-12 md:h-12 h-10'>
            <InputField
              className=''
              name={`name`}
              inputProps={{
                className: `bg-transparent text-black buttontext4-regular w-full black-placeholder autofill-color-black ${handleColorValidation(
                  'name'
                )}`,
                placeholder: 'Nombre',
              }}
              options={{ required: '*Campo requerido' }}
              form={form}
            />
          </div>
          <InputField
            className='md:col-span-6 col-span-12'
            name={`lastName`}
            inputProps={{
              className: `bg-transparent text-black buttontext4-regular w-full black-placeholder autofill-color-black ${handleColorValidation(
                'lastName'
              )}`,
              placeholder: 'Apellido',
            }}
            options={{ required: '*Campo requerido' }}
            form={form}
          />
          <InputField
            name={`email`}
            className='md:col-span-6 col-span-12'
            inputProps={{
              className: `bg-transparent text-black buttontext4-regular w-full black-placeholder autofill-color-black ${handleColorValidation(
                'email'
              )}`,
              placeholder: 'E-mail',
            }}
            options={{ required: '*Campo requerido' }}
            form={form}
          />
          <InputField
            name={`repeat_email`}
            className='md:col-span-6 col-span-12'
            inputProps={{
              className: `bg-transparent text-black buttontext4-regular w-full black-placeholder autofill-color-black ${handleColorValidation(
                'repeat_email'
              )}`,
              placeholder: 'Confirmar E-mail',
            }}
            options={{
              required: '*Campo requerido',
              pattern: { value: emailRegex, message: 'Formato invalido' },
              validate: () => form.watch('email') === form.watch('repeat_email') || 'Los email deben coincidir',
            }}
            form={form}
          />
          <InputField
            name={`phone`}
            className='md:col-span-6 col-span-12'
            inputProps={{
              type: 'number',
              className: `bg-transparent text-black buttontext4-regular w-full black-placeholder autofill-color-black ${handleColorValidation(
                'phone'
              )}`,
              placeholder: 'Teléfono',
            }}
            form={form}
          />
          <InputField
            className='md:col-span-6 col-span-12'
            name={`address.country`}
            inputProps={{
              className: `bg-transparent text-black buttontext4-regular w-full black-placeholder autofill-color-black ${handleColorValidation(
                'address.country'
              )}`,
              placeholder: 'País',
            }}
            options={{ required: '*Campo requerido' }}
            form={form}
          />
        </div>

        <div className='w-full  text-right mt-4'>
          <FiButton theme='light' type='submit' className='px-6 py-1'>
            <p className='buttontext4-medium'>Enviar</p>
          </FiButton>
        </div>
      </form>
    </FormStepContainer>
  )
}

export default FreelancerStepFour
