import { Box } from '@material-ui/core'
import ScoreBar from '../../assets/UIkit/ScoreBar'

const ComentsCard: React.FC = () => {
  return (
    <Box className='border border-black p-2 mt-0-8'>
      <Box className='flex justify-between'>
        <Box>
          <p className='body1-medium'>Nombre Cliente</p>
          <p className='microcopy'>10/08/2021</p>
        </Box>
        <Box className='bg-yellow rounded-full h-4 w-4' />
      </Box>

      <p className='body1-bold mt-3'>Título Proyecto</p>
      <p className='microcopy'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, porro? Aliquam explicabo quia labore dolorum nemo
        doloremque, laboriosam sunt? Veniam aliquid repudiandae reiciendis exercitationem eius libero ex tempore dolore ad.
      </p>
      <Box className='flex items-center mt-3'>
        <ScoreBar variant='smile' />
        <span className=' body1-bold ml-1'>4</span>
      </Box>
    </Box>
  )
}

export default ComentsCard
