import React, { PropsWithChildren } from 'react'

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import { IconButton, Dialog, DialogContent } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'

type TAppDialog = {
  open: boolean
  title: string
  fullScreen?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onClose?: () => void
  handleClose?: (e: any) => void
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: 'var(--black)',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: 4,
      color: theme.palette.grey[500],
    },
  })

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <span className='subtitle4-medium  text-white'>{children}</span>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const AppDialog: React.FC<TAppDialog> = (props: PropsWithChildren<any>) => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      maxWidth={props.maxWidth ? props.maxWidth : 'sm'}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
        <span className='subtitle4-medium  text-white'>{props.title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContent className='p-2'>{props.children}</DialogContent>
      </DialogContent>
    </Dialog>
  )
}

export default AppDialog
