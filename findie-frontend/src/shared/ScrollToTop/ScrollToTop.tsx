import { Fab, Zoom } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

type TScrollToTop = {
  open: boolean
  onClick: () => void
}

const ScrollToTop: React.FC<TScrollToTop> = (props) => {
  return (
    <div className='fixed bottom-2 right-10 z-50'>
      <Zoom in={props.open}>
        <Fab className='bg-gray-400' size='small' aria-label='scroll back to top' onClick={props.onClick}>
          <KeyboardArrowUpIcon className='text-white' />
        </Fab>
      </Zoom>
    </div>
  )
}

export default ScrollToTop
