import { PropsWithChildren } from 'react'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'

type TVariant = 'contained' | 'outlined' | 'default'
type TTheme = 'primary' | 'secondary' | 'light' | 'danger'
type TSize = 'micro' | 'small' | 'medium' | 'large'

interface IFiButton {
  className?: string
  variant?: TVariant
  theme?: TTheme
  size?: TSize
  asLink?: boolean
  to?: string
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
  onClick?: (e?: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    structure: {
      borderRadius: 44,
      padding: '.25rem 9px',
      textTransform: 'none',
      border: 'none',
      transition: 'all 250ms',
    },

    disabled: {
      backgroundColor: '#e0e0e0',
      color: 'rgba(0, 0, 0, 0.26)',
      cursor: 'default',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    },
    //Styles
    'primary-contained': {
      backgroundColor: theme.palette.blue,
      color: theme.palette.white,
      '&:hover': {
        backgroundColor: theme.palette.blue,
      },
    },
    'primary-outlined': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.blue}`,
      color: theme.palette.blue,
      '&:hover': {
        backgroundColor: theme.palette.blue005,
      },
    },
    'primary-default': {
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.palette.blue,
      boxShadow: 'none !important',
      '&:hover': {
        backgroundColor: theme.palette.blue005,
      },
    },
    'secondary-contained': {
      backgroundColor: theme.palette.black,
      color: theme.palette.white,
      '&:hover': {
        backgroundColor: theme.palette.black,
      },
    },
    'secondary-outlined': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.black}`,
      color: theme.palette.black,
    },
    'light-contained': {
      backgroundColor: theme.palette.white,
      border: `1.5px solid ${theme.palette.black}`,
      color: theme.palette.black,
      '&:hover': {
        backgroundColor: theme.palette.white,
      },
    },
    'danger-contained': {
      backgroundColor: theme.palette.red,
      color: theme.palette.white,
      '&:hover': {
        backgroundColor: theme.palette.red,
      },
    },
    'danger-outlined': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.red}`,
      color: theme.palette.red,
      '&:hover': {
        backgroundColor: 'var(--red-005)',
      },
    },
    'danger-default': {
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.palette.red,
      boxShadow: 'none !important',
      '&:hover': {
        backgroundColor: 'var(--red-005)',
      },
    },
    //Sizes
    micro: {
      padding: '0px 10px',
    },
    small: {
      padding: '2px 10px',
    },
    medium: {
      padding: '.25rem 9px',
    },
    large: {
      padding: '6px 30px',
    },
  })
)

const FiButton: React.FC<IFiButton> = (props: PropsWithChildren<any>) => {
  const { children, className, variant, size, theme, asLink, ...other } = props
  const classes = useStyles()

  const buttonStyles = () => {
    if (props.disabled) {
      return classes.disabled
    }
    const selectedVariant: TVariant = variant ? props.variant : 'contained'
    const selectedTheme: TTheme = theme ? props.theme : 'primary'
    //@ts-ignore
    return classes[`${selectedTheme}-${selectedVariant}`]
  }

  const buttonSize = () => {
    const selectedSize: TSize = props.size ? props.size : 'medium'
    return classes[selectedSize]
  }

  return (
    <>
      {asLink ? (
        <Button
          className={`buttontext2-semibold text-center ${className} ${classes.structure} ${buttonStyles()} ${buttonSize()}`}
          {...other}
          component={RouterLink}
          to={props.to}
        >
          {children}
        </Button>
      ) : (
        <Button className={`buttontext2-semibold ${className} ${classes.structure} ${buttonStyles()} ${buttonSize()}`} {...other}>
          {children}
        </Button>
      )}
    </>
  )
}

export default FiButton
