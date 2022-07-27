import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

type TArrow = {
  className?: string
  direction: 'horizontal' | 'vertical'
  horizontalSize?: 'small' | 'large'
}

const Arrow: React.FC<TArrow> = (props) => {
  const { view } = useWebSiteLayout()

  const viewColor = view.textColor.includes('text-black') ? 'black' : 'white'
  return (
    <>
      {(!props.direction || props.direction === 'horizontal') && (!props.horizontalSize || props.horizontalSize === 'large') && (
        <svg
          className={`${props.className}`}
          width={400}
          height='17'
          viewBox='50 -5 286 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M283.51 7.89492L274.36 0.789833L274.973 0L285.784 8.39492L274.973 16.7898L274.36 16L283.51 8.89492H0V7.89492H283.51Z'
            fill={viewColor}
          />
        </svg>
      )}
      {props.direction === 'horizontal' && props.horizontalSize === 'small' && (
        <svg width={76} height={17} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M73.51 7.895L64.36.79l.613-.79 10.811 8.395-10.81 8.395-.614-.79 9.15-7.105H0v-1h73.51z'
            fill='#fff'
          />
        </svg>
      )}
      {props.direction === 'vertical' && (
        <svg
          className={`${props.className}`}
          width='14'
          height='50'
          viewBox='0 0 14 50'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_231:23)'>
            <path d='M6.99988 1L7.22021 48.7488' stroke={viewColor} />
            <path d='M13 40.0566L7.34009 49.0103L1.18231 40.0566' stroke={viewColor} />
          </g>
          <defs>
            <clipPath id='clip0_231:23'>
              <rect width='50' height='14' fill={viewColor} transform='translate(14) rotate(90)' />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  )
}

export default Arrow
