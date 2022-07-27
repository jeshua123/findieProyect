import { Box } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

type TCustomPagination = {
  pages: number
  page: number
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void
  position?: 'start' | 'center' | 'end'
  className?: string
}

const CustomPagination: React.FC<TCustomPagination> = (props) => {
  return (
    <>
      {props.pages > 1 && (
        <Box className={`${props.className} justify-${props.position}`}>
          <Pagination count={props?.pages} page={props?.page} onChange={props?.onChange} />
        </Box>
      )}
    </>
  )
}

export default CustomPagination
