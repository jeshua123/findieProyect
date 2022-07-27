import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import endpoints from '../../constants/endpoints'
import { apiClient } from '../../utils/ApiClient'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { IFormStep } from '../../models/IFormStep'
import { ISkill } from '../../models/ISkill'

import FormStepContainer from '../FormStepContainer/FormStepContainer'

import { Collapse } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import InputField from '../../assets/UIkit/Forms/InputField'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { sortByString } from '../../utils/helpers'

const FormSkillsStep: React.FC<IFormStep & { userType: 'client' | 'freelancer' }> = (props) => {
  const storage = props.storage
  return (
    <FormStepContainer>
      <p className={`formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 mb-12 ${props.setTheme().textColor}`}>
        {props.userType.includes('client')
          ? '¿Qué habilidades/conocimientos necesitarías que el profesional maneje?'
          : '¿En qué áreas, habilidades y conocimientos tienes experiencia como profesional?'}
      </p>

      {storage.item?.categorySelected?.is_other_category ? <ProposedSkills {...props} /> : <Skills {...props} />}
    </FormStepContainer>
  )
}

export default FormSkillsStep

const Skills: React.FC<IFormStep & { userType: 'client' | 'freelancer' }> = (props) => {
  const { slide } = useParams<{ slide: string }>()
  const form = useForm()
  const skillsQuery = useQueryClient()
  const [queryDataSkills, setQueryDataSkills] = useState<ISkill[]>([])
  const [skillsByCategory, setSkillsByCategory] = useState<ISkill[]>([])
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([])
  const [open, setOpen] = useState(false)
  const filterWord = form.watch('skill') ? form.watch('skill').toString().toLowerCase() : form.watch('skill')
  const storage = props.storage

  const getSkills = async () => {
    const categoryFilter = JSON.stringify({ category: storage.item.category })
    const resp = await skillsQuery.fetchQuery(`all_${endpoints.skills}`, () => apiClient.getSkillsByCategory(categoryFilter))
    setQueryDataSkills(resp.data)
    setSkillsByCategory(resp.data)
  }

  const handleSkills = (selectedSkill: ISkill, action: 'add' | 'remove') => {
    if (action.includes('add')) {
      const removeSkill = skillsByCategory
        .filter((skill: ISkill) => skill._id !== selectedSkill._id)
        .sort((a, b) => sortByString(a, b, 'name'))
      setSkillsByCategory(removeSkill)
      setSelectedSkills([...selectedSkills, selectedSkill])
    }
    if (action.includes('remove')) {
      const removeSkill = selectedSkills.filter((skill: ISkill) => skill._id !== selectedSkill._id)
      setSkillsByCategory([...skillsByCategory, selectedSkill].sort((a, b) => sortByString(a, b, 'name')))
      setSelectedSkills(removeSkill)
    }
  }

  useEffect(() => {
    if (slide !== props.currentStep) return
    props.setIsButtonDisabled(!storage?.item?.skills)
    getSkills()
  }, [slide])

  //Set selected skills from local storage
  useEffect(() => {
    if (storage.item.skills && storage.item.skills.length > 0) {
      const parsedSkills = storage.item.skills.reduce((acum: ISkill[], skill: string) => {
        const hasSkill = queryDataSkills.find((iter: ISkill) => iter._id === skill)
        if (hasSkill) {
          return [...acum, hasSkill]
        }
        return acum
      }, [])
      setSelectedSkills(parsedSkills)
    } else {
      setSelectedSkills([])
    }
  }, [queryDataSkills])

  //Set array of id in local storage
  useEffect(() => {
    if (slide !== props.currentStep) return

    const skills = selectedSkills.map((skill: ISkill) => skill._id)
    storage.setItem({ ...storage.item, skills })
    props.setIsButtonDisabled(!selectedSkills.length)
  }, [selectedSkills])

  //Filter skills list by word
  useEffect(() => {
    if (filterWord) {
      const itemsFilters = queryDataSkills.filter((skill: ISkill) => skill.name.toString().toLowerCase().includes(filterWord))
      setSkillsByCategory(itemsFilters)
    } else {
      setSkillsByCategory(queryDataSkills)
    }
  }, [filterWord])

  return (
    <div className='h-96'>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className='relative'>
          <InputField
            name='skill'
            inputProps={{
              className: `border-b-orange formtext2-regular text-orange orange-placeholder bg-transparent mb-4 w-full`,
              placeholder: 'Escribe acá',
              onClick: () => setOpen(true),
            }}
            form={form}
          />
          <Collapse
            in={open}
            className={`border-orange p-4 d:max-h-48 max-h-52 overflow-y-scroll absolute top-14 left-0 w-full z-20 ${
              props.setTheme().containerBgColor
            }`}
          >
            <div>
              {skillsByCategory.map((skill: ISkill, index) => {
                return (
                  <p
                    key={index}
                    className={`buttontext4-regular cursor-pointer mt-2 ${props.setTheme().textColor}`}
                    onClick={() => handleSkills(skill, 'add')}
                  >
                    {skill.name}
                  </p>
                )
              })}
            </div>
          </Collapse>
        </div>
      </ClickAwayListener>

      <div className='flex flex-wrap md:mt-12 mt-2 md:max-h-48 max-h-28 overflow-y-scroll'>
        {selectedSkills.map((skill: ISkill) => {
          return (
            <p
              className={`rounded-3xl flex items-center border-orange px-2 py-1 inline mr-2 mt-1 ${props.setTheme().textColor}`}
              key={skill._id}
            >
              {skill.name}
              <HighlightOffIcon
                fontSize='small'
                className='text-orange cursor-pointer ml-2'
                onClick={() => handleSkills(skill, 'remove')}
              />
            </p>
          )
        })}
      </div>
    </div>
  )
}

const ProposedSkills: React.FC<IFormStep> = (props) => {
  const form = useForm()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const storage = props.storage

  const handleSkills = (action: 'add' | 'remove', selectedSkill?: string) => {
    if (action.includes('remove')) {
      const removeSkill = selectedSkills.filter((skill: string) => skill !== selectedSkill)
      setSelectedSkills(removeSkill)
      storage.setItem({
        ...storage.item,
        proposed_options: { ...storage.item.proposed_options, skills: removeSkill },
        skills: [],
      })
      return
    }

    if (selectedSkills.includes(form.watch('proposed_options.category'))) {
      return setErrorMessage('Esta habilidad ya la agregaste')
    }

    const addedSkills = [...selectedSkills, form.watch('proposed_options.category')]
    storage.setItem({ ...storage.item, proposed_options: { ...storage.item.proposed_options, skills: addedSkills }, skills: [] })
    setSelectedSkills(addedSkills)
    form.setValue('proposed_options.category', '')
  }

  useEffect(() => {
    setErrorMessage('')
  }, [form.watch('proposed_options.category')])

  useEffect(() => {
    props.setIsButtonDisabled(!storage.item?.proposed_options?.skills?.length)
  }, [storage.item?.proposed_options?.skills])

  return (
    <>
      <div className='flex items-center'>
        <InputField
          className='w-full'
          name='proposed_options.category'
          inputProps={{
            className: `border-b-orange formtext2-regular text-orange orange-placeholder bg-transparent w-full`,
            placeholder: 'Sugierenos habilidades',
          }}
          form={form}
        />
        <span
          className='text-orange ml-4 subtitle2-regular rounded-xl border-orange px-2 cursor-pointer'
          onClick={() => handleSkills('add')}
        >
          Agregar
        </span>
      </div>
      <p className='microcopy text-red h-8'>{errorMessage}</p>

      <div className='flex flex-wrap md:mt-12 mt-2 md:max-h-48 max-h-24 overflow-y-scroll'>
        {selectedSkills.map((skill: string) => {
          return (
            <p
              className={`rounded-3xl flex items-center border-orange px-2 py-1 inline mr-2 mt-1 ${props.setTheme().textColor}`}
              key={skill}
            >
              {skill}
              <HighlightOffIcon
                fontSize='small'
                className='text-orange cursor-pointer ml-2'
                onClick={() => handleSkills('remove', skill)}
              />
            </p>
          )
        })}
      </div>
    </>
  )
}
