import { useContext, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ISkill } from '../../models/ISkill'
import { ICategory } from '../../models/ICategory'
import { CategoriesContext } from '../../context/Cpanel/CategoriesContext'
import { personalFields } from '../../constants/Cpanel/FreelancersConstant'
import { UseQueryResult } from 'react-query'
import { IFreelancer } from '../../models/IFreelancer'
import useSelectCategoriesSkills from '../../customHooks/useSelectCategoriesSkills'
import moment from 'moment'

import FormUploadButton from '../FormUploadButton/FormUploadButton'

import { Box, Chip, Grid } from '@material-ui/core'
import SelectField from '../../assets/UIkit/Forms/SelectField'
import InputField from '../../assets/UIkit/Forms/InputField'
import { usePlansQuery } from '../../customHooks/request/plansQuery'
import { IPlan } from '../../models/IPlan'
import FiButton from '../../assets/UIkit/FiButton'
import { useRemovePortfolioPdf } from '../../customHooks/request/freelancersQuery'
import useRequestAlert from '../../customHooks/useRequestAlert'

type TFreelancersForm = {
  form: UseFormReturn<any>
  freelancer?: UseQueryResult<IFreelancer, unknown>
  isDisabledFields?: boolean
  asFreelancerFindie?: boolean
  asPostulation?: boolean
}

const FreelancersForm: React.FC<TFreelancersForm> = (props) => {
  const { categoriesQuery } = useContext(CategoriesContext)
  const plansQuery = usePlansQuery({ entity: 'freelancer', is_available: true })
  const removePortfolioMutation = useRemovePortfolioPdf()
  const [freelancerCategory, skillsList, freelancerSkills, selectedSkills, removeSkill, categorySelected] =
    useSelectCategoriesSkills(props.form, props.freelancer)
  const [cvFiles, setCvFiles] = useState({ fileToDownloadName: '', fileToDownload: '' })
  const [portfolioFiles, setPortfolioFiles] = useState({ fileToDownloadName: '', fileToDownload: '' })
  const [avatarFiles, setAvatarFiles] = useState({ fileToDownloadName: '', fileToDownload: '' })
  useRequestAlert(removePortfolioMutation)

  useEffect(() => {
    if (props?.freelancer?.isSuccess) {
      const freelancerData: Record<string, any> = props?.freelancer?.data
      const freelancerDataArray = Object.keys(freelancerData)
      const formatedPersonalFields = personalFields.reduce((acum: string[], field: string) => {
        const hasField = freelancerDataArray.some((iter: string) => iter === field)
        return (acum = hasField ? [...acum, field] : acum)
      }, [])

      formatedPersonalFields.forEach((field: string) => {
        const nestedFields: { [key: string]: any } = {
          address: () => {
            props.form.setValue('address.country', props.freelancer?.data?.address?.country)
            props.form.setValue('address.city', props.freelancer?.data?.address?.city)
          },
          category: () => {
            props.form.setValue('category', JSON.stringify(props.freelancer?.data?.category))
            props.form.setValue('category_selected', JSON.stringify(props.freelancer?.data?.category))
          },
          createdAt: () => props.form.setValue('createdAt', moment(props.freelancer?.data?.createdAt).format('YYYY-MM-DD')),
          birthdate: () => props.form.setValue('birthdate', moment(props.freelancer?.data?.birthdate).format('YYYY-MM-DD')),
          cv: () => setCvFiles({ fileToDownloadName: freelancerData?.cv?.file_name, fileToDownload: freelancerData?.cv?.url }),
          plan: () => props.form.setValue('plan', props.freelancer?.data?.plan?._id),
          portfolio: () =>
            setPortfolioFiles({
              fileToDownloadName: freelancerData?.portfolio?.file_name,
              fileToDownload: freelancerData?.portfolio?.url,
            }),
          avatar: () =>
            setAvatarFiles({
              fileToDownloadName: freelancerData?.avatar?.file_name,
              fileToDownload: freelancerData?.avatar?.url,
            }),
        }
        nestedFields[field] ? nestedFields[field]() : props.form.setValue(field, freelancerData[field])
      })
    }
  }, [props?.freelancer?.isSuccess])

  return (
    <Box>
      <Grid container className='mt-4' spacing={2}>
        <Grid item lg={4} md={6}>
          <InputField
            name='name'
            label='Nombre'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu nombre' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='lastName'
            label='Apellido'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu apellido' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='birthdate'
            label='Fecha de nacimiento'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, type: 'date' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='address.country'
            label='País'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu país' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='address.city'
            label='Ciudad'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu ciudad' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='nationality'
            label='Nacionalidad'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu nacionalidad' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='email'
            label='Email'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa tu email', type: 'email' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='phone'
            label='Teléfono'
            inputProps={{
              className: 'w-full',
              disabled: props.isDisabledFields,
              placeholder: 'Ingresa tu telefono',
              type: 'number',
            }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
        <Grid item lg={4} md={6}>
          <InputField
            name='createdAt'
            label='Fecha de ingreso'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, type: 'date' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item lg={4} md={6}>
          {categoriesQuery.isSuccess && !props.isDisabledFields && (
            <SelectField
              name='category_selected'
              label='Categoría'
              inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Nombre de la categoría' }}
              options={{ required: 'Este campo es requerido' }}
              form={props.form}
              selectOptions={categoriesQuery.data
                .filter((category: ICategory) => !category.is_other_category && category.is_available)
                .map((category: ICategory) => {
                  return { value: JSON.stringify(category), label: category.name }
                })}
            />
          )}
          {props.isDisabledFields && freelancerCategory && (
            <InputField
              name='freelancer_category'
              label='Categoría'
              inputProps={{
                className: 'w-full',
                disabled: props.isDisabledFields,
                value: freelancerCategory,
              }}
              form={props.form}
            />
          )}
        </Grid>
        {categorySelected?.is_other_category && (
          <Grid item lg={4} md={6}>
            <InputField
              name='proposed_category'
              label='Categoría propuesta'
              inputProps={{
                className: 'w-full',
                disabled: props.isDisabledFields,
                value: props.freelancer?.data?.proposed_options?.category,
              }}
              form={props.form}
            />
          </Grid>
        )}
        <Grid item lg={4} md={6}>
          <InputField
            name='invitation_ticket'
            label='Ticket Invitación'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa el ticket' }}
            form={props.form}
          />
        </Grid>
        <Grid item xs={4}>
          {plansQuery.isSuccess && (
            <SelectField
              name='plan'
              label='Plan Findie'
              inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Nombre de la categoría' }}
              options={{ required: 'Este campo es requerido' }}
              form={props.form}
              selectOptions={plansQuery.data.map((plan: IPlan) => {
                return { value: plan._id, label: plan.name }
              })}
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {!props.isDisabledFields && (
          <Grid item lg={4} xs={6}>
            {categoriesQuery.isSuccess && (
              <SelectField
                name='skills_options'
                label='Selecciona una habilidad'
                inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Nombre de la categoría' }}
                form={props.form}
                selectOptions={skillsList.map((skill: ISkill) => {
                  return { value: JSON.stringify(skill), label: skill.name }
                })}
              />
            )}
          </Grid>
        )}
        <Grid item lg={8} md={10}>
          <p className='subtitle4-medium'>
            {props?.freelancer?.data?.category?.is_other_category ? 'Habilidades propuestas' : 'Habilidades seleccionadas'}
          </p>
          {categorySelected?.is_other_category ? (
            <Box className='border border-gray-300 px-2 pb-4' height={130} overflow='auto'>
              {props?.freelancer?.data?.proposed_options.skills.map((skill: string) => {
                return <Chip key={skill} label={skill} color='primary' className='mr-2 mt-2 buttontext2-regular' />
              })}
            </Box>
          ) : (
            <Box className='border border-gray-300 px-2 pb-4' height={130} overflow='auto'>
              {props.isDisabledFields &&
                freelancerSkills.map((skill: ISkill) => {
                  return <Chip key={skill._id} label={skill.name} color='primary' className='mr-2 mt-2' />
                })}
              {!props.isDisabledFields &&
                selectedSkills.map((skill: ISkill) => {
                  return (
                    <Chip
                      key={skill._id}
                      label={skill.name}
                      onDelete={() => removeSkill(skill)}
                      color='primary'
                      className='mr-2 mt-2 buttontext2-regular'
                    />
                  )
                })}
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} className='mt-2'>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <FormUploadButton
                className='mr-20'
                form={props.form}
                label='Curriculum'
                fileUrl='cv.url'
                fileName='cv.file_name'
                accept='.pdf'
                isDisabled={props.isDisabledFields}
                asPostulation={props.asPostulation}
                freelancerFiles={cvFiles}
                setFreelancerFiles={setCvFiles}
              />
            </Grid>
            {props.asFreelancerFindie && (
              <Grid item xs={4}>
                <FormUploadButton
                  className='mr-20'
                  form={props.form}
                  label='Avatar'
                  fileUrl='avatar.url'
                  fileName='avatar.file_name'
                  accept='.png, .jpg, .jpeg'
                  isDisabled={props.isDisabledFields}
                  asPostulation={props.asPostulation}
                  freelancerFiles={avatarFiles}
                  setFreelancerFiles={setAvatarFiles}
                />
              </Grid>
            )}
            <Grid item xs={4}>
              {(props.asFreelancerFindie || props.asPostulation) && props.freelancer?.data?.portfolio.file_name && (
                <div>
                  <FormUploadButton
                    className='mr-20'
                    form={props.form}
                    label='Portafolio'
                    fileUrl='portfolio.url'
                    fileName='portfolio.file_name'
                    accept='.pdf'
                    isDisabled={props.isDisabledFields}
                    asPostulation={props.asPostulation}
                    freelancerFiles={portfolioFiles}
                    setFreelancerFiles={setPortfolioFiles}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <InputField
            name='portfolio_link'
            label='Link'
            inputProps={{ className: 'w-full', disabled: props.isDisabledFields, placeholder: 'Ingresa el link' }}
            options={{ required: categorySelected?.is_link_required ? 'Este campo es requerido' : false }}
            form={props.form}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default FreelancersForm
