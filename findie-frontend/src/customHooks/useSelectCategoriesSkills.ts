import { UseFormReturn } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useState, useEffect } from 'react'
import { ISkill } from '../models/ISkill'
import { ICategory } from '../models/ICategory'
import endpoints from '../constants/endpoints'
import { apiClient } from '../utils/ApiClient'

const defaultCategory = {
  portfolio: {
    isRequired: false,
    should_render: false,
  },
  is_link_required: true,
}

const useSelectCategoriesSkills = (form: UseFormReturn<any>, entity?: any, asProject?: boolean) => {
  const skillsQuery = useQueryClient()
  const [skillsList, setSkillsList] = useState<any>([])
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([])
  const [categorySelected, setCategorySelected] = useState<Partial<ICategory>>(defaultCategory)
  const [entitySkills, setEntitySkills] = useState<ISkill[]>([])
  const [entityCategory, setEntityCategory] = useState<string>('')

  const getSkills = async () => {
    if (form.watch('category_selected')) {
      const categoryFilter = JSON.stringify({ category: JSON.parse(form.watch('category_selected'))?._id })
      const resp = await skillsQuery.fetchQuery(`all_${endpoints.skills}`, () => apiClient.getSkillsByCategory(categoryFilter))
      setSelectedAndSkillsList(resp.data)
    } else {
      setSkillsList([])
      setSelectedSkills([])
    }
  }

  const setSelectedAndSkillsList = (querySkillsList: ISkill[]) => {
    if (
      (entity?.isSuccess || entity?._id) &&
      (entity?.data?.skills?.length || entity?.skills?.length) &&
      (entity?.data?.category?.name === JSON.parse(form?.watch('category_selected'))?.name ||
        entity?.category?.name === JSON.parse(form?.watch('category_selected'))?.name)
    ) {
      const newSkillsList = entity.data.skills.reduce((acum: ISkill[], skill: ISkill) => {
        return acum.filter((iter: ISkill) => iter._id !== skill._id)
      }, querySkillsList)
      setSkillsList(newSkillsList)
      !asProject && setSelectedSkills(entity.data.skills)
    } else {
      setSkillsList(querySkillsList)
      setSelectedSkills([])
    }
  }

  const addSkill = () => {
    const skillSelected = JSON.parse(form.watch('skills_options'))
    setSelectedSkills([...selectedSkills, skillSelected])
    setSkillsList(skillsList.filter((iter: ISkill) => iter._id !== skillSelected._id))
  }

  const removeSkill = (skill: ISkill) => {
    setSelectedSkills(selectedSkills.filter((iter: ISkill) => iter._id !== skill._id))
    setSkillsList([...skillsList, skill])
  }

  useEffect(() => {
    getSkills()
    if (form.watch('category_selected')) {
      const category = JSON.parse(form.watch('category_selected'))
      setCategorySelected(category)
      form.setValue('category', category?._id)
    }
  }, [form.watch('category_selected')])

  useEffect(() => {
    form.watch('skills_options') && addSkill()
  }, [form.watch('skills_options')])

  useEffect(() => {
    const formatedSelectedSkills = selectedSkills.map((selected: ISkill) => selected._id)
    form.setValue('skills', formatedSelectedSkills)
  }, [selectedSkills])

  useEffect(() => {
    if ((entity?.isSuccess || entity?._id) && !asProject) {
      setEntitySkills(entity.data.skills)
      getSkills()
      setEntityCategory(entity?.data?.category?.name ?? '')
    }
  }, [entity?.isSuccess, entity])

  return [entityCategory, skillsList, entitySkills, selectedSkills, removeSkill, categorySelected, setSelectedSkills]
}

export default useSelectCategoriesSkills
