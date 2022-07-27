import { useState } from 'react'

import { Box, Button, Grid, Select, TextField } from '@material-ui/core'
import ComentsCard from '../../../shared/ComentsCard/ComentsCard'
import ScoreBar from '../../../assets/UIkit/ScoreBar'
import AppDialog from '../../../assets/UIkit/AppDialog'

const FreelancerComments: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <Box className='mt-5'>
      <Box className='flex justify-between mb-4'>
        <Box className='flex'>
          <Box className='flex items-center mr-1'>
            <ScoreBar variant='smile' />
            <span className=' body1-bold ml-1'>4</span>
          </Box>
          <Box className='flex items-center'>
            <ScoreBar variant='sad' />
            <span className=' body1-bold ml-1'>4</span>
          </Box>
        </Box>

        <Button variant='contained' color='primary' onClick={() => setIsDialogOpen(true)}>
          Agregar
        </Button>
      </Box>
      <ComentsCard />
      <ComentsCard />
      <ComentsCard />
      <ComentsCard />

      <AppDialog open={isDialogOpen} title='Agragar comentario' handleClose={() => setIsDialogOpen(false)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span className='subtitle4-medium'>Calificación</span>
            <Select className='w-full' variant='filled' native>
              <option value='' />
              <option value='option'>Positivo</option>
              <option value='option'>Negativo</option>
            </Select>
          </Grid>
          <Grid item xs={6} className='total-center pt-5'>
            <ScoreBar variant='smile' size='small' />
          </Grid>
          <Grid item xs={6}>
            <span className='subtitle4-medium'>Nombre Cliente</span>
            <TextField variant='filled' className='w-full' />
          </Grid>
          <Grid item xs={6}>
            <span className='subtitle4-medium'>Fecha de ingreso</span>
            <TextField type='date' variant='filled' className='w-full' />
          </Grid>
          <Grid item xs={12}>
            <span className='subtitle4-medium'>Escribe aquí el comentario</span>
            <TextField type='date' variant='outlined' className='w-full' multiline rows={4} />
          </Grid>
        </Grid>

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button variant='contained' className='mr-2' onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant='contained' color='primary'>
            Aceptar
          </Button>
        </Box>
      </AppDialog>
    </Box>
  )
}

export default FreelancerComments
