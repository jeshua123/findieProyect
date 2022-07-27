import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { IFormStep } from '../../../models/IFormStep'
import { loadFile, urlRegex } from '../../../utils/helpers'

import FormStepContainer from '../../../shared/FormStepContainer/FormStepContainer'
import UploadFile from '../../../shared/UploadFile/UploadFile'

import InputField from '../../../assets/UIkit/Forms/InputField'
import { FiIcons } from '../../../assets/UIkit/Icons/FiIcons'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const FreelancerStepThree: React.FC<IFormStep> = (props) => {
  const { slide } = useParams<{ slide: string }>()
  const storage = props.storage
  const form = useForm({})
  const portfolioLink = form.watch('portfolio_link') ?? ''

  const removeFile = (fileType: 'cv' | 'portfolio') => {
    let storageEdited = storage.item
    delete storageEdited[fileType]
    storage.setItem({ ...storageEdited })
  }

  const isStepValid = () => {
    const { categorySelected } = storage.item
    if (!categorySelected.name) return false

    let buttonState = false
    if (categorySelected.portfolio.isRequired && categorySelected.is_link_required) {
      buttonState = !!storage.item.cv?.file_name && !!storage.item.portfolio?.file_name && !!storage.item?.portfolio_link
    }
    if (categorySelected.portfolio.isRequired && !categorySelected.is_link_required) {
      buttonState = !!storage.item.cv?.file_name && !!storage.item.portfolio?.file_name
    }
    if (categorySelected.is_link_required && !categorySelected.portfolio.isRequired) {
      buttonState = !!storage.item.cv?.file_name && !!storage.item?.portfolio_link
    }
    if (!categorySelected.is_link_required && !categorySelected.portfolio.isRequired) {
      buttonState = !!storage.item.cv?.file_name
    }
    props.setIsButtonDisabled(!buttonState)
  }

  useEffect(() => {
    if (form.watch('cv')?.item(0)?.name || form.watch('portfolio')?.item(0)?.name) {
      const files = form.getValues()
      delete files.portfolio_link
      Object.entries(files).forEach(async ([key, value]) => {
        if (value && value?.item(0)?.name && value?.item(0)?.name !== storage.item[key]?.file_name) {
          storage.setItem({ ...storage.item, [key]: { file_name: value.item(0)?.name, url: await loadFile(value) } })
        }
      })
    }
  }, [form.watch('cv'), form.watch('portfolio')])

  useEffect(() => {
    storage.setItem({ ...storage.item, portfolio_link: portfolioLink ?? '' })
  }, [portfolioLink])

  useEffect(() => {
    if (slide !== '3') return

    form.setValue('portfolio_link', storage.item.portfolio_link ?? '')
    isStepValid()
  }, [storage.item])

  useEffect(() => {
    slide === '3' && isStepValid()
  }, [slide, form.watch('cv'), form.watch('portfolio'), portfolioLink])

  return (
    <FormStepContainer>
      <div className='h-80'>
        <p className={`formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 mb-12 text-black`}>Adjunta ahora los siguientes archivos:</p>

        <div className='flex items-center'>
          <p className='formtext1-regular'>
            {storage.item.cv?.file_name ? (
              <>{storage.item.cv?.file_name}</>
            ) : (
              <>
                Currículum <span className='text-red'>* </span>
                <span className='text-orange'>(PDF de hasta 5 MB)</span>
              </>
            )}
          </p>
          <UploadFile
            name='cv'
            className='ml-4'
            accept='.pdf'
            fileSelected={storage.item.cv?.file_name}
            uploadElement={<FiIcons name='add' />}
            removeElement={<DeleteOutlineIcon fontSize='large' className='text-red ml-4' />}
            form={form}
            onRemove={() => removeFile('cv')}
          />
        </div>
        {storage.item.categorySelected?.portfolio?.should_render && (
          <div className='flex items-center mt-8'>
            <p className='formtext1-regular'>
              {storage.item.portfolio?.file_name ? (
                <>{storage.item.portfolio?.file_name}</>
              ) : (
                <>
                  Portafolio <span className='text-red'>{storage.item.categorySelected?.portfolio?.isRequired ? '* ' : ''}</span>
                  <span className='text-orange'>(PDF de hasta 5 MB)</span>{' '}
                </>
              )}
            </p>
            <UploadFile
              name='portfolio'
              className='ml-4'
              accept='.pdf'
              fileSelected={storage.item.portfolio?.file_name}
              uploadElement={<FiIcons name='add' />}
              removeElement={<DeleteOutlineIcon fontSize='large' className='text-red ml-4' />}
              form={form}
              onRemove={() => removeFile('portfolio')}
            />
          </div>
        )}
        <div className='grid grid-cols-12 mt-8'>
          <p className='formtext1-regular col-span-2'>
            Link <span className='text-red'>{storage.item.categorySelected?.is_link_required ? '*' : ''}</span>
          </p>
          <div className='col-span-10'>
            <InputField
              name='portfolio_link'
              inputProps={{
                type: 'url',
                className: `border-b-orange formtext2-regular text-orange orange-placeholder bg-transparent w-full`,
                placeholder: 'web, github, youtube, etc',
              }}
              form={form}
            />
          </div>
        </div>
      </div>
    </FormStepContainer>
  )
}

export default FreelancerStepThree
