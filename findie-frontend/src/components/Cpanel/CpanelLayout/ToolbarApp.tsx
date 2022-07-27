import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../../constants/routes'
import useAuth from '../../../customHooks/useAuth'

import CpanelAvatar from '../../../shared/CpanelAvatar/CpanelAvatar'

import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Menu, MenuItem, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

type TToolbarApp = {
  open: boolean
  setOpen: (e: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.white,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: 220,
      width: `calc(100% - 220px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
  })
)

const TollbarApp: React.FC<TToolbarApp> = (props) => {
  const classes = useStyles()
  const { userLogged } = useAuth()
  const navigate = useHistory().push
  const auth = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenu = (action: 'profile' | 'go_home' | 'logout') => {
    const dispatch = {
      profile: () => navigate(routes.cpanel.profile),
      go_home: () => navigate(routes.web_site.home),
      logout: () => {
        navigate(routes.web_site.home)
        auth.logout()
      },
    }
    dispatch[action]()
    setAnchorEl(null)
  }

  return (
    <AppBar position='fixed' className={clsx(classes.appBar, { [classes.appBarShift]: props.open })}>
      <Toolbar>
        <div className={`${props.open ? 'flex flex justify-end' : 'flex flex justify-between'} w-full`}>
          <IconButton
            onClick={() => props.setOpen(true)}
            edge='start'
            className={clsx(classes.menuButton, { [classes.hide]: props.open })}
          >
            <MenuIcon className='text-black w-8 h-8' />
          </IconButton>

          <IconButton onClick={handleClick}>
            <CpanelAvatar
              size='small'
              variant={userLogged?.avatar_style ?? 'sea_blue'}
              name={userLogged?.name ?? ''}
              lastName={userLogged?.last_name ?? ''}
            />
          </IconButton>
          <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleMenu('profile')}>
            <MenuItem onClick={() => handleMenu('profile')}>
              <span className='buttontext2-regular'>Perfil y cuenta</span>
            </MenuItem>
            <MenuItem onClick={() => handleMenu('go_home')}>
              <span className='buttontext2-regular'>Ir al sitio web</span>
            </MenuItem>
            <MenuItem onClick={() => handleMenu('logout')}>
              <span className='buttontext2-regular'>Cerrar sesión</span>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TollbarApp
