import React, { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import SelectField from '../../../assets/UIkit/Forms/SelectField'
import { useClientsQuery } from '../../../customHooks/request/clientsQuery'
import { IClient } from '../../../models/IClient'
import ProjectList from '../../../shared/Project/ProjectList'

const AllProjectList: FC = () => {
  const form = useForm()
  const { data: clientQuery, isSuccess } = useClientsQuery({
    $and: [{ $or: [{ client_status: 'available' }, { client_status: 'suspended' }] }],
  })
  const client = form.watch('client')

  const clientList = useMemo(() => {
    if (!isSuccess) return []
    return (
      clientQuery &&
      clientQuery.data.map((client: IClient) => {
        return { value: client._id, label: client.companyName }
      })
    )
  }, [isSuccess])

  return (
    <>
      <h3 className='mb-8'>Listado de proyectos</h3>
      <SelectField
        className='-mb-12'
        name='client'
        label='Filta proyectos por clientes'
        selectOptions={clientList}
        inputProps={{ className: 'w-60' }}
        form={form}
      />
      <ProjectList clientId={client ? client : undefined} />
    </>
  )
}

export default AllProjectList
