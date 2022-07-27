import avatarLarge from '../../assets/images/cpanel/profile/avatar-mask-large.png'
import avatarSmall from '../../assets/images/cpanel/profile/avatar-mask-small.png'

type TCpanelAvatar = {
  variant: 'yellow' | 'strong_rose' | 'red' | 'sea_blue' | 'soft_blue' | 'light_black' | 'white'
  name: string
  lastName: string
  size: 'small' | 'large'
  className?: string
  onClick?: () => void
}

const CpanelAvatar: React.FC<TCpanelAvatar> = (props) => {
  const styleCondition = props.size === 'large' ? 'lg:w-60 w-56 lg:h-60 h-56' : 'w-7 h-6'

  const theme = () => {
    const dispatch: Record<string, string> = {
      yellow: 'bg-yellow text-red',
      strong_rose: 'bg-strong-rose text-sea-blue',
      red: 'bg-red text-strong-rose',
      sea_blue: 'bg-sea-blue text-yellow',
      soft_blue: 'bg-soft-blue text-rose',
      light_black: 'bg-light-black text-yellow',
    }
    return dispatch[props.variant]
  }

  return (
    <div
      className={`${styleCondition} ${props.className} relative flex justify-center items-center cursor-pointer ${theme()}`}
      onClick={props.onClick}
    >
      <img src={avatarLarge} alt='avatar' className='absolute top-0 left-0 z-10 w-full h-full' />
      <h1 className={`text-center ${props.size === 'large' ? 'h1-plus' : 'body2-medium font-bold'} `}>
        {props.name.charAt(0).toUpperCase()}
        {props.lastName.charAt(0).toLowerCase()}
      </h1>
    </div>
  )
}

export default CpanelAvatar
