import { IBrand } from '../../../models/IBrand'

import LogoBlack from '../../../assets/images/brand/logo-black.svg'
import LogoWhite from '../../../assets/images/brand/logo-white.svg'

const FindieLogo: React.FC<IBrand> = (props) => {
  return (
    <>
      {!props.color || (props.color === 'black' && <img src={LogoBlack} className={props.className} alt='logo' />)}
      {props.color === 'white' && <img src={LogoWhite} className={props.className} alt='logo' />}
    </>
  )
}

export default FindieLogo
