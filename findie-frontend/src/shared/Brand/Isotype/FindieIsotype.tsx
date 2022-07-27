import { IBrand } from '../../../models/IBrand'

import ContainedIsotype from '../../../assets/images/brand/findie-icon.svg'
import DegradeIsotype from '../../../assets/images/brand/degrade-isotype.svg'
import OutlinedIsotype from '../../../assets/images/brand/outlined-black-isotype.svg'

const FindieIsotype: React.FC<IBrand> = (props) => {
  return (
    <>
      {(!props.variant || props.variant === 'contained-black') && (
        <img src={ContainedIsotype} className={props.className} alt='isotype' />
      )}
      {props.variant === 'outlined-black' && <img src={OutlinedIsotype} className={props.className} alt='isotype' />}
      {props.variant === 'degrade' && <img src={DegradeIsotype} className={props.className} alt='isotype' />}
    </>
  )
}

export default FindieIsotype
