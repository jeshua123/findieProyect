import {
  AddIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChrevronUpIcon,
  EditIcon,
  EyeIcon,
  LinkIcon,
  SkullIcon,
  StarIcon,
  SuspendedIcon,
} from './Icons'

export type TCustomIcons = {
  Icon?: any
  fill?: string
  width?: string
  height?: string
  className?: string
  onClick?: (e?: any) => void
}

export const IconsDict = {
  star: StarIcon,
  skull: SkullIcon,
  suspended: SuspendedIcon,
  eye: EyeIcon,
  bookmark: BookmarkIcon,
  chrevron_left: ChevronLeftIcon,
  chrevron_right: ChevronRightIcon,
  chrevron_up: ChrevronUpIcon,
  chrevron_down: ChevronDownIcon,
  add: AddIcon,
  edit: EditIcon,
  link: LinkIcon,
}

export const FiIcons = (props: TCustomIcons & { name: keyof typeof IconsDict }) => {
  const Icon = IconsDict[props.name]

  return <Icon {...props} />
}
