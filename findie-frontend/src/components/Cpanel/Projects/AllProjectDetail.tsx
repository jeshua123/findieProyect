import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useClientQuery } from '../../../customHooks/request/clientsQuery'
import useSwitchOnOff from '../../../customHooks/useSwitchOnOff'
import Project from '../../../shared/Project/Project'

const AllProjectDetail: FC = () => {
  const param = useParams<{ clientId: string }>()
  const switchOnOff = useSwitchOnOff()
  const client = useClientQuery(param.clientId)

  return (
    <div>
      <div className='flex justify-between'>
        <h3>
          {client.data?.name} {client.data?.lastName}
        </h3>
        {switchOnOff.render()}
      </div>

      <Project isDisabledFields={!switchOnOff.switchState} />
    </div>
  )
}

export default AllProjectDetail
