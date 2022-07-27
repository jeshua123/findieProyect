import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

type TLoader = {
  open: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: 20000,
      color: '#fff',
    },
  })
)

const Loader: React.FC<TLoader> = (props) => {
  const classes = useStyles()

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open ? true : false}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Loader
