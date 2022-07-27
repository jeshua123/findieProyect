import { IBrand } from '../../../models/IBrand'

import DefaultIsotype from '../../../assets/images/brand/default-isotype.gif'
import ContainedWhiteIsotype from '../../../assets/images/brand/contained-white-isotype.gif'
import ContainedBlackIsotype from '../../../assets/images/brand/contained-black-isotype.gif'

const FindieGifIsotype: React.FC<IBrand> = (props) => {
  return (
    <>
      {(!props.variant || props.variant === 'contained-black') && (
        <img src={ContainedBlackIsotype} className={props.className} alt='isotype' />
      )}
      {props.variant === 'contained-white' && <img src={ContainedWhiteIsotype} className={props.className} alt='isotype' />}
      {props.variant === 'default' && <img src={DefaultIsotype} className={props.className} alt='isotype' />}
    </>
  )
}

export default FindieGifIsotype
