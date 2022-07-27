import { useEffect, useState, useMemo } from 'react'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { usePostClientProjectMutation } from '../../../customHooks/request/clientsQuery'
import routes from '../../../constants/routes'
import { IFormStep } from '../../../models/IFormStep'
import { IProject } from '../../../models/IProject'
import { IClient } from '../../../models/IClient'
import useLocalStorage from '../../../customHooks/useLocalStorage'
import { IClientProject } from '../../../models/IClientProject'
import { Link } from 'react-router-dom'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import { industryOptions } from '../../../constants/Cpanel/ProjectConstants'

import FormStepContainer from '../../../shared/FormStepContainer/FormStepContainer'

import FiButton from '../../../assets/UIkit/FiButton'
import InputField from '../../../assets/UIkit/Forms/InputField'
import SpecialSelect from '../../../shared/SpecialSelect.tsx/SpecialSelect'
import { IFreelancer } from '../../../models/IFreelancer'

const ClientStepSeven: React.FC<IFormStep & { freelancerId: string }> = (props) => {
  const history = useHistory()
  const snackbar = useSnackbar()
  const clientStorage = useLocalStorage('client', { createdAt: new Date().getTime() })
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const projectStorage: IProject = props.storage.item
  const projectValidation =
    !projectStorage.category ||
    !projectStorage.skills ||
    !projectStorage.plan ||
    !projectStorage.title ||
    !projectStorage.brief ||
    !projectStorage.budget
  const formDefaultValues = {
    name: clientStorage.item.name ?? '',
    companyName: clientStorage.item.phone ?? '',
    email: clientStorage.item.email ?? '',
    industry: clientStorage.item.repeat_email ?? '',
  }
  const form = useForm({ defaultValues: formDefaultValues })
  const clientMutation = usePostClientProjectMutation()
  useSetLoader(clientMutation)

  const handleColorValidation = (field: 'email' | 'name' | 'companyName' | 'industry') => {
    return form.watch(field) ? 'client-success-validation' : 'client-error-validation'
  }

  const stepValidation = useMemo(() => {
    return [
      { step: '1', title: 'Paso 1: Categoría del proyecto', storageField: !projectStorage.category },
      {
        step: '2',
        title: 'Paso 2: Habilidades del profesional',
        storageField: !projectStorage.skills,
      },
      {
        step: '3',
        title: 'Paso 3: Plan',
        storageField: !projectStorage.plan,
      },
      {
        step: '4',
        title: 'Paso 4: Titulo del proyecto',
        storageField: !projectStorage.title,
      },
      {
        step: '5',
        title: 'Paso 4: Descripción del proyecto',
        storageField: !projectStorage.brief,
      },
      {
        step: '6',
        title: 'Paso 4: Presupuesto',
        storageField: !projectStorage.budget,
      },
    ]
  }, [projectStorage])

  const createClient: SubmitHandler<IClient> = (client) => {
    const totalData: IClientProject = {
      project: projectStorage,
      client: {
        ...client,
        createdAt: new Date().getTime(),
        favorite_freelancer: props.freelancerId === 'paso' ? undefined : (props.freelancerId as unknown as IFreelancer),
      },
    }
    clientMutation.mutate(totalData, {
      onSuccess: () => {
        clientStorage.removeItem()
        props.storage.removeItem()
        history.push(routes.web_site.client_suscription_form.step_eight)
      },
      onError: (error: any) => {
        snackbar.enqueueSnackbar(error.json.error, { variant: 'error' })
      },
    })
  }

  useEffect(() => {
    let inputFields = { ...clientStorage.item }
    Object.entries(form.getValues()).forEach(([key, value]) => {
      inputFields = { ...inputFields, [key]: value }
    })
    clientStorage.setItem(inputFields)
  }, [form.watch('email'), form.watch('name'), form.watch('companyName'), form.watch('industry')])

  if (projectValidation) {
    return (
      <FormStepContainer>
        <p className='formtext1-regular text-white'>Los siguientes pasos estan incompletos y son requeridos:</p>

        {stepValidation.map((step) => {
          return (
            <div key={step.title}>
              {step.storageField && (
                <p className='buttontext4-regular text-white md:mt-8 mt-3'>
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
      <p className='formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 md:mb-12 mb-6 text-white'>
        Estamos por terminar, ahora necesitamos tus datos para conectarte con nuestros freelancers:
      </p>

      <form onSubmit={form.handleSubmit(createClient)}>
        <InputField
          name={`email`}
          inputProps={{
            className: `bg-transparent text-white buttontext4-regular w-full white-placeholder autofill-color-white ${handleColorValidation(
              'email'
            )}`,
            placeholder: 'Email',
          }}
          options={{ required: '*Campo requerido' }}
          form={form}
        />
        <InputField
          name={`companyName`}
          className='md:mt-8 mt-3'
          inputProps={{
            className: `bg-transparent text-white buttontext4-regular w-full white-placeholder autofill-color-white ${handleColorValidation(
              'companyName'
            )}`,
            placeholder: 'Nombre de tu empresa',
          }}
          options={{ required: '*Campo requerido' }}
          form={form}
        />
        <InputField
          name={`name`}
          className='md:mt-8 mt-3'
          inputProps={{
            className: `bg-transparent text-white buttontext4-regular w-full white-placeholder autofill-color-white ${handleColorValidation(
              'name'
            )}`,
            placeholder: 'Nombre de contacto',
          }}
          options={{ required: '*Campo requerido' }}
          form={form}
        />

        <SpecialSelect
          options={industryOptions}
          name='industry'
          form={form}
          selectedOption={selectedIndustry}
          setSelectedOption={setSelectedIndustry}
          setTheme={props.setTheme}
        />

        <p className='body2-regular text-white mt-4'>
          Al enviar este formulario de contacto afirmas que has leído y aceptado nuestros{' '}
          <Link className='text-white underline-offset-1' to={routes.web_site.terms_conditions}>
            Términos y condiciones
          </Link>
          , y{' '}
          <Link className='text-white underline-offset-1' to={routes.web_site.terms_conditions}>
            Políticas de privacidad.
          </Link>
        </p>
        <div className='w-full  text-right mt-4'>
          <FiButton theme='light' type='submit' className='px-6 py-1'>
            <p className='buttontext4-medium'>Enviar</p>
          </FiButton>
        </div>
      </form>
    </FormStepContainer>
  )
}

export default ClientStepSeven
