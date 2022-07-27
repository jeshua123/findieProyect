import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { ICategory } from '../models/ICategory'
import { ISkill } from '../models/ISkill'
import { apiClient } from '../utils/ApiClient'
import { useSetLoader } from './useSetLoader'
import endpoints from '../constants/endpoints'

const defaultStack = { stack_id: '', category: {}, skills: [] }

const useProjectStack = (form: UseFormReturn<any>) => {
  const skillsQuery = useQueryClient()
  const [skillsList, setSkillsList] = useState<any[]>([])
  const [selectedStack, setSelectedStack] = useState<any>(defaultStack)
  const formCategory = form.watch('category_selected')
  const skillsOptions = form.watch('skills_options')
  const loader = useSetLoader()

  const getSkills = async () => {
    const category = JSON.parse(formCategory)
    if (!category) return setSkillsList([])

    const categoryFilter = JSON.stringify({ category: category?._id })
    loader.setIsOpen(true)
    const skills = await skillsQuery.fetchQuery(`fetch_${endpoints.skills}`, () => apiClient.getSkillsByCategory(categoryFilter))

    if (selectedStack.stack_id) {
      const stackSkillsRemoved = selectedStack.skills.reduce((acum: ISkill[], skill: ISkill) => {
        return acum.filter((iter: ISkill) => iter._id !== skill._id)
      }, skills.data)
      setSkillsList(stackSkillsRemoved)
      loader.setIsOpen(false)
      return
    }
    setSkillsList(skills.data)
    setSelectedStack({ category, stack_id: '', skills: [] })
    loader.setIsOpen(false)
  }

  const addSkill = () => {
    const skillSelected = JSON.parse(skillsOptions)
    setSelectedStack({ ...selectedStack, skills: [...selectedStack.skills, skillSelected] })
    setSkillsList(skillsList.filter((iter: ISkill) => iter._id !== skillSelected._id))
  }

  const removeSkill = (skill: ISkill) => {
    const skills = selectedStack.skills.filter((iter: ISkill) => iter._id !== skill._id)
    setSelectedStack({ ...selectedStack, skills })
    setSkillsList([...skillsList, skill])
  }

  useEffect(() => {
    if (!formCategory) return
    getSkills()
  }, [formCategory])

  useEffect(() => {
    skillsOptions && addSkill()
  }, [skillsOptions])

  return { skillsList, selectedStack, defaultStack, removeSkill, setSelectedStack, setSkillsList }
}

export default useProjectStack
