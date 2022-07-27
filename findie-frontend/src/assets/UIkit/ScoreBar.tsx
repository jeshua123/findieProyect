import { Box } from '@material-ui/core'
import { SadFaceIcon, SmileFaceIcon } from './icons'

type TScoreBar = {
  variant: string
  size?: string
}

const ScoreBar: React.FC<TScoreBar> = (props) => {
  return (
    <>
      {props.variant === 'smile' ? (
        <Box className=''>
          <SmileFaceIcon
            color='var(--yellow)'
            width={props.size === 'small' ? '25' : '40'}
            height={props.size === 'small' ? '25' : '40'}
          />
          <SmileFaceIcon
            color='var(--yellow)'
            width={props.size === 'small' ? '25' : '40'}
            height={props.size === 'small' ? '25' : '40'}
          />
          <SmileFaceIcon
            color='var(--yellow)'
            width={props.size === 'small' ? '25' : '40'}
            height={props.size === 'small' ? '25' : '40'}
          />
          <SmileFaceIcon width={props.size === 'small' ? '25' : '40'} height={props.size === 'small' ? '25' : '40'} />
          <SmileFaceIcon width={props.size === 'small' ? '25' : '40'} height={props.size === 'small' ? '25' : '40'} />
        </Box>
      ) : (
        <Box className=''>
          <SadFaceIcon
            color='var(--sky-blue)'
            width={props.size === 'small' ? '25' : '40'}
            height={props.size === 'small' ? '25' : '40'}
          />
          <SadFaceIcon
            color='var(--sky-blue)'
            width={props.size === 'small' ? '25' : '40'}
            height={props.size === 'small' ? '25' : '40'}
          />
          <SadFaceIcon
            color='var(--sky-blue)'
            width={props.size === 'small' ? '25' : '40'}
            height={props.size === 'small' ? '25' : '40'}
          />
          <SadFaceIcon width={props.size === 'small' ? '25' : '40'} height={props.size === 'small' ? '25' : '40'} />
          <SadFaceIcon width={props.size === 'small' ? '25' : '40'} height={props.size === 'small' ? '25' : '40'} />
        </Box>
      )}
    </>
  )
}

export default ScoreBar
