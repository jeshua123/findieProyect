import { ReactComponent as Star } from '../../images/icons/star-icon.svg'
import { ReactComponent as Skull } from '../../images/icons/skull-icon.svg'
import { ReactComponent as Suspended } from '../../images/icons/suspended-icon.svg'
import { ReactComponent as Eye } from '../../images/icons/eye-icon.svg'
import { ReactComponent as Bookmark } from '../../images/icons/bookmark-icon.svg'
import { ReactComponent as ChevronLeft } from '../../images/icons/chevron-left-icon.svg'
import { ReactComponent as ChevronRight } from '../../images/icons/chevron-right-icon.svg'
import { ReactComponent as ChevronUp } from '../../images/icons/chevron-up-icon.svg'
import { ReactComponent as ChevronDown } from '../../images/icons/chevron-down-icon.svg'
import { ReactComponent as Add } from '../../images/icons/add-icon.svg'
import { ReactComponent as Link } from '../../images/icons/link-icon.svg'
import { ReactComponent as Edit } from '../../images/icons/edit-icon.svg'

import { TCustomIcons } from './FiIcons'

export const StarIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Star} {...props} />
}

export const SkullIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Skull} {...props} />
}

export const SuspendedIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Suspended} {...props} />
}

export const EyeIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Eye} {...props} />
}

export const BookmarkIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Bookmark} {...props} />
}

export const ChevronLeftIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={ChevronLeft} {...props} />
}

export const ChevronRightIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={ChevronRight} {...props} />
}

export const ChrevronUpIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={ChevronUp} {...props} />
}

export const ChevronDownIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={ChevronDown} {...props} />
}

export const AddIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Add} {...props} />
}

export const LinkIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Link} {...props} />
}

export const EditIcon: React.FC<TCustomIcons> = (props) => {
  return <DefaultIcon Icon={Edit} {...props} />
}

const DefaultIcon: React.FC<TCustomIcons> = (props) => {
  return (
    <props.Icon
      className={`${props.className} inline-block ${!props.className?.includes('svg') && 'svg-transparent'}`}
      onClick={props.onClick}
    />
  )
}
