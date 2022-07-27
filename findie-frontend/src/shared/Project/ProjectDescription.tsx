import { useEffect, useState } from 'react'
import { projectFields } from '../../constants/Cpanel/ClientesConstant'
import { IStack } from '../../models/IProject'
import { ISkill } from '../../models/ISkill'
import { TProjectSections } from './Project'

import ProjectStack from './ProjectStack'

import { Box, Button, Chip, Divider, Grid } from '@material-ui/core'
import InputField from '../../assets/UIkit/Forms/InputField'
import ProjectForm from './ProjectForm'
import useUf from '../../customHooks/useUf'
import { cleanCLP } from '../../utils/helpers'

const ProjectDescription: React.FC<TProjectSections> = (props) => {
  const setInputDefaultProps = props.setInputDefaultProps
  const { data: todayUf } = useUf()
  const [stackList, setStackList] = useState<Partial<IStack>[]>([])
  const projectId = props.project?.data?._id ?? ''

  const editProject = (data: any) => {
    if (!props.project.isSuccess) return

    const stack_list = stackList.map((iter: Partial<IStack>) => {
      return {
        ...iter,
        stack_id: iter.stack_id,
        category: iter.category?._id,
        skills: iter?.skills ?? [].map((skill: ISkill) => skill._id),
      }
    })
    const uf = +todayUf ?? 0
    const price = { ...data.price, subtotal: cleanCLP(data.price.subtotal) }

    props.updateProjectPriceMutation.mutate({ body: { ...data, price, stack_list, uf }, _id: projectId })
  }

  useEffect(() => {
    if (props?.project?.isSuccess) {
      const projectData: Record<string, any> = props?.project?.data
      projectFields.forEach((field: string) => {
        const nestedFields: { [key: string]: any } = {
          plan: () => props.form.setValue('plan', props.project?.data?.plan?._id),
        }
        nestedFields[field] ? nestedFields[field]() : props.form.setValue(field, projectData[field])
      })
      setStackList(props.project.data.stack_list)
    }
  }, [props?.project?.isSuccess])

  return (
    <Box>
      <form onSubmit={props.form.handleSubmit(editProject)}>
        <ProjectForm isDisabledFields={props.isDisabledFields} form={props.form} />

        <Grid container spacing={2} className='mt-2'>
          {props.project?.data?.proposed_options?.category && (
            <>
              <Grid item xs={12}>
                <p className='subtitle4-medium mt-6'>Opciones propuestas por el cliente</p>
              </Grid>
              <Grid item xs={4}>
                <InputField {...setInputDefaultProps({ name: 'proposed_category', label: 'Categoría propuesta' })} />
              </Grid>
              <Grid item xs={8}>
                <Box className='border border-gray-300 px-4 pb-2 mt-6' height={90} overflow='auto'>
                  {props.project?.data?.proposed_options?.skills.map((skill: string) => {
                    return <Chip key={skill} label={skill} color='primary' className='mr-2 mt-2' />
                  })}
                </Box>
              </Grid>
            </>
          )}
        </Grid>

        {props.project?.data?.category && props.project?.data?.skills && (
          <Grid container spacing={2} className='mt-2'>
            <Grid item xs={12}>
              <p className='subtitle4-medium mt-6'>Opciones propuestas por el cliente desde la web</p>
            </Grid>
            <Grid item xs={12}>
              <p className='body2-regular'>Categoria: {props.project?.data?.category?.name}</p>
              <div className='flex items-center'>
                <p className='body2-regular mr-2'>Habilidades:</p>
                <Box>
                  {props.project.data.skills.map((skill: ISkill) => {
                    return <Chip key={skill._id} label={skill.name} color='primary' className='mr-2 mt-2' />
                  })}
                </Box>
              </div>
            </Grid>
          </Grid>
        )}

        {props.project?.data?.evaluation_status !== 'step_one' && (
          <ProjectStack
            isDisabledFields={props.isDisabledFields}
            project={props.project}
            form={props.form}
            stackList={stackList}
            setStackList={setStackList}
            setInputDefaultProps={setInputDefaultProps}
          />
        )}

        <Divider className='mt-8' />
        <Box className='flex justify-end mt-4'>
          <Button variant='contained' color='primary' type='submit' disabled={props.isDisabledFields}>
            {props.project ? 'Guardar cambios' : 'Crear proyecto'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default ProjectDescription
