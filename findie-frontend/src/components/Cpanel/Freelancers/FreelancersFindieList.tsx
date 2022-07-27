import { useEffect, useContext, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFreelancersQuery } from '../../../customHooks/request/freelancersQuery'
import { IFreelancer } from '../../../models/IFreelancer'
import { useSetLoader } from '../../../customHooks/useSetLoader'
import { CategoriesContext } from '../../../context/Cpanel/CategoriesContext'
import usePagination from '../../../customHooks/usePagination'
import useFilterByWord from '../../../customHooks/useFilterByWord'

import { Box, Chip, Grid, List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import routes from '../../../constants/routes'

import CustomPagination from '../../../assets/UIkit/CustomPagination'
import FreelancerShortCuts from '../../../shared/FreelancerShortCuts/FreelancerShortCuts'
import Tabs, { TTab } from '../../../assets/UIkit/Tabs'
import { ICategory } from '../../../models/ICategory'
import useGroupAlphabetList from '../../../customHooks/useGroupAlphabetList'
import SelectField from '../../../assets/UIkit/Forms/SelectField'
import { ISkill } from '../../../models/ISkill'
import { useForm } from 'react-hook-form'
import { useSkillsQuery } from '../../../customHooks/request/skillsQuery'

const limit = 20

const FreelancersFindieList: React.FC = () => {
  const form = useForm()
  const pagination = usePagination()
  const { categoriesQuery } = useContext(CategoriesContext)
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
  const { word, renderInput } = useFilterByWord()
  const [selectedSkills, setSelectedSkills] = useState<ISkill[]>([])
  const freelancersQuery = useFreelancersQuery({
    $and: [
      { $or: [{ freelancer_status: 'available' }, { freelancer_status: 'suspended' }] },
      {
        $or: [
          { name: word ? { $regex: word, $options: 'i' } : undefined },
          { lastName: word ? { $regex: word, $options: 'i' } : undefined },
        ],
      },
    ],
    category: categoryId,
    skills: selectedSkills.map((skill: ISkill) => skill._id),
    page: pagination.page,
    limit,
  })
  const skillQuery = useSkillsQuery({ category: categoryId ?? '' })
  const freelancers = useGroupAlphabetList<IFreelancer>(freelancersQuery)
  const [tabs, setTabs] = useState<TTab[]>([])
  useSetLoader(freelancersQuery)
  const selectedSkill = form.watch('skills_options')

  const skillsList = useMemo(() => {
    if (!skillQuery.isSuccess) return []

    return skillQuery.data
      .filter((skill: ISkill) => {
        const findSkill = selectedSkills.some((chossenkill: ISkill) => chossenkill._id === skill._id)
        return !findSkill
      })
      .map((skill: ISkill) => {
        return { value: JSON.stringify(skill), label: skill.name }
      })
  }, [skillQuery.isSuccess, selectedSkills])

  const setNewSkill = () => {
    if (!selectedSkill) return

    const parsedSkill = JSON.parse(selectedSkill)
    setSelectedSkills([...selectedSkills, parsedSkill])
  }

  const removeSkill = (skillToDelete: ISkill) => {
    const removeSkill = selectedSkills.filter((skill: ISkill) => skill._id !== skillToDelete._id)
    setSelectedSkills(removeSkill)
  }

  useEffect(() => {
    if (categoriesQuery.isSuccess) {
      const categories = categoriesQuery.data
        .filter((category: ICategory) => !category.is_other_category)
        .map((category: ICategory, index: number) => {
          const tab: TTab = {
            id: index,
            text: category.name,
            isSelected: index === 0,
            action: () => setCategoryId(category._id),
          }
          return tab
        })
      setTabs(categories)
      setCategoryId(categoriesQuery.data[0]?._id ?? undefined)
    }
  }, [categoriesQuery.isSuccess])

  useEffect(() => {
    setNewSkill()
  }, [selectedSkill])

  return (
    <>
      <h3>Freelancers Findie</h3>
      <Grid container className='mt-4' spacing={4}>
        <Grid item lg={7} md={10}>
          <p className='subtitle4-medium'>Filtra por nombre</p>
          {renderInput()}
          {freelancersQuery.isSuccess && freelancersQuery.data.data.length === 0 && word && (
            <span className='subtitle3-regular text-red block'>No se encontraron resultados de la búsqueda</span>
          )}
          <div className='mt-2'>{tabs.length > 0 && <Tabs tabs={tabs} />}</div>
        </Grid>
        <Grid item xs={5}>
          <Box display='grid' gridTemplateColumns='1fr 100px'>
            <div>
              <SelectField
                name='skills_options'
                label='Selecciona una habilidad'
                inputProps={{ className: 'w-full border border-gray-300' }}
                form={form}
                selectOptions={skillsList}
              />
              <div className='flex flex-wrap border border-300 overflow-auto h-20 mt-2 p-2'>
                {selectedSkills.map((skill: ISkill) => {
                  return (
                    <Chip
                      key={skill._id}
                      label={skill.name}
                      color='primary'
                      size='small'
                      onDelete={() => removeSkill(skill)}
                      className='mr-2 mt-2 buttontext2-regular'
                    />
                  )
                })}
              </div>
            </div>
            {selectedSkills.length > 0 && (
              <p className='microcopy text-red text-center cursor-pointer' onClick={() => setSelectedSkills([])}>
                Cancelar filtro
              </p>
            )}
          </Box>
        </Grid>
      </Grid>

      <p className='col-span-1 buttontext4-regular text-blue text-right mt-2'>
        {freelancersQuery.isSuccess && `${freelancersQuery.data?.metadata?.count}`}
      </p>
      {freelancers.map((structure, index) => {
        return (
          <div key={structure.letter}>
            {structure.list.length > 0 && (
              <>
                <p className={`subtitle2-bold ${index !== 0 ? 'mt-4' : ''}`}>{structure.letter}</p>
                <List className='mt-2 border-t border-r border-l border-gray-300 py-0'>
                  {structure.list.map((freelancer: IFreelancer) => {
                    return (
                      <div key={freelancer._id} className='border-b border-gray-300'>
                        <ListItem button>
                          <Link to={`${routes.cpanel.freelancers.findie}/${freelancer._id}`} className='w-full'>
                            <div className='grid grid-cols-12'>
                              <span className='col-span-3 buttontext4-regular'>
                                {freelancer?.name}, {freelancer?.lastName}
                              </span>
                              <span className='col-span-5 buttontext4-regular'>{freelancer?.college_degree}</span>
                            </div>
                          </Link>
                          <ListItemSecondaryAction>
                            <FreelancerShortCuts
                              freelancer={freelancer}
                              page={pagination.page}
                              freelancersQuery={freelancersQuery}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </div>
                    )
                  })}
                </List>
              </>
            )}
          </div>
        )
      })}

      {freelancersQuery.isSuccess && (
        <div className='flex justify-center'>
          <CustomPagination
            pages={freelancersQuery.data.metadata.pages}
            page={pagination.page}
            onChange={pagination.handlePage}
            position={'center'}
            className='mt-4'
          />
        </div>
      )}
    </>
  )
}

export default FreelancersFindieList
