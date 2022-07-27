import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import TollbarApp from '../../components/Cpanel/CpanelLayout/ToolbarApp'
import DrawerApp from '../../components/Cpanel/CpanelLayout/DrawerApp'

import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import CpanelRouter from '../../appRouter/CpanelRouter'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

const CpanelLayout: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   history.push(`${routes.cpanel}${routes.cpanenChilds.freelancers}/registro`)
  // }, [])
  const componentsProps = {
    open: open,
    setOpen: setOpen,
  }

  return (
    <div className='flex'>
      <CssBaseline />

      <TollbarApp {...componentsProps} />
      <DrawerApp {...componentsProps} />

      <Box height='calc(100vh - 64px)' width='100%' className={`pl-4 bg-light-gray mt-16`}>
        <Box height='100%' className='p-8 bg-white'>
          <Box overflow='auto' height='100%' className='px-8 py-12'>
            <CpanelRouter />
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default CpanelLayout
