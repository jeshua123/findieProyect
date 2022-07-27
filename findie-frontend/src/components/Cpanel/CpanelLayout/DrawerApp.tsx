import { Link } from 'react-router-dom'
import routes from '../../../constants/routes'

import clsx from 'clsx'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import { Box, Drawer, List, Divider, ListItem, Collapse, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import freelancersIcon from '../../../assets/images/cpanel/freelancers/freelancers-icon.svg'
import findieIcon from '../../../assets/images/brand/findie-icon.svg'
import clientsIcon from '../../../assets/images/cpanel/clients/clients-icon.svg'
import assetsIcon from '../../../assets/images/cpanel/assets/assets-icon.svg'
import boardIcon from '../../../assets/images/cpanel/board/board-icon.svg'
import projectIcon from '../../../assets/images/cpanel/projects/project-icon.png'

type TdrawerLinks = {
  title: string
  link?: string
}
type TDrawerApp = {
  open: boolean
  setOpen: (e: boolean) => void
}

const freelancerLinks: TdrawerLinks[] = [
  { title: 'Registro', link: `${routes.cpanel.freelancers.register}` },
  { title: 'Postulantes', link: `${routes.cpanel.freelancers.postulations}` },
  { title: 'Freelancers Findie', link: `${routes.cpanel.freelancers.findie}` },
]
const clientLinks: TdrawerLinks[] = [
  { title: 'Registro', link: `${routes.cpanel.clients.register}` },
  { title: 'Postulantes', link: `${routes.cpanel.clients.postulations}` },
  { title: 'Clientes Findie', link: `${routes.cpanel.clients.findie}` },
]

const projectLinks: TdrawerLinks[] = [
  { title: 'Listado', link: `${routes.cpanel.projects.list}` },
  { title: 'Simulador', link: `${routes.cpanel.projects.simulator}` },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 220,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: 220,
      borderRight: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      borderRight: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 62,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

const DrawerApp: React.FC<TDrawerApp> = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => props.setOpen(false)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon className='text-black' /> : <ChevronLeftIcon className='text-black' />}
        </IconButton>
      </div>
      <Divider />
      <Box height='100%' display='grid' gridTemplateRows='90% 10%' gridTemplateColumns={`${props.open ? '100%' : 62}`}>
        <Box>
          <span onClick={() => props.setOpen(true)} className='buttontext4-medium flex items-center ml-2 mt-10 cursor-pointer'>
            <img src={freelancersIcon} alt='freelancer-icon' className='mr-2' />
            Freelancers
          </span>
          <Collapse in={props.open}>
            <List>
              {props.open &&
                freelancerLinks.map((iter: TdrawerLinks) => (
                  <Link key={iter.title} to={iter.link ?? ''}>
                    <ListItem>
                      <span className='buttontext2-regular text-black'>{iter.title}</span>
                    </ListItem>
                  </Link>
                ))}
              <ListItem button>
                <Link to={routes.cpanel.freelancers.findie}>
                  <p className='buttontext2-regular text-black ml-4'>Quick actions</p>
                </Link>
              </ListItem>
              <Link to={routes.cpanel.freelancers.findie_featured}>
                <ListItem button>
                  <p className='buttontext2-regular text-black ml-4'>Destacados</p>
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <span onClick={() => props.setOpen(true)} className='buttontext4-medium flex items-center ml-2 mt-3 cursor-pointer'>
            <img src={clientsIcon} alt='freelancer-icon' className='mr-2' />
            Clientes
          </span>
          <Collapse in={props.open}>
            <List>
              {props.open &&
                clientLinks.map((iter: TdrawerLinks) => (
                  <Link key={iter.title} to={iter.link ?? ''}>
                    <ListItem button>
                      <span className='buttontext2-regular text-black'>{iter.title}</span>
                    </ListItem>
                  </Link>
                ))}
            </List>
          </Collapse>
          <Link to={`${routes.cpanel.assets.index}`}>
            <span className='buttontext4-medium flex items-center ml-2 mt-3 cursor-pointer text-black'>
              <img src={assetsIcon} alt='freelancer-icon' className='mr-2' />
              Assets
            </span>
          </Link>
          <span
            onClick={() => props.setOpen(true)}
            className='buttontext4-medium flex items-center ml-2 mt-6 cursor-pointer text-black'
          >
            <img src={projectIcon} alt='freelancer-icon' className='mr-2' />
            Proyectos
          </span>
          <Collapse in={props.open}>
            <List>
              {props.open &&
                projectLinks.map((iter: TdrawerLinks) => (
                  <Link key={iter.title} to={iter.link ?? ''}>
                    <ListItem button>
                      <span className='buttontext2-regular text-black'>{iter.title}</span>
                    </ListItem>
                  </Link>
                ))}
            </List>
          </Collapse>
          <Link to={`${routes.cpanel.board}`}>
            <span className='buttontext4-medium flex items-center ml-2 mt-6 cursor-pointer text-black'>
              <img src={boardIcon} alt='freelancer-icon' className='mr-2' />
              Board
            </span>
          </Link>
        </Box>
        <Box className='flex justify-center'>
          <img src={findieIcon} className='w-12 h-12' alt='freelancer-icon' />
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerApp
