import { useState, Dispatch, SetStateAction } from 'react'

export type TRequestAction =
  | ''
  | 'post'
  | 'edit'
  | 'delete'
  | 'featured'
  | 'suspend'
  | 'hidden'
  | 'studies'
  | 'approve'
  | 'experience'
  | 'finished'
  | 'images'
  | 'link'
type TDialogState = {
  isOpen: boolean
  data: any
}
type THookReturn = {
  setRecuestAction: Dispatch<SetStateAction<TRequestAction>>
  toogleDialog: (e?: any) => void
  dialog: TDialogState
  recuestAction: TRequestAction
}

const useOpenDialog = (): THookReturn => {
  const [dialog, setDialog] = useState<TDialogState>({ isOpen: false, data: '' })
  const [recuestAction, setRecuestAction] = useState<TRequestAction>('post')

  const toogleDialog = (data?: any) => {
    setDialog({ ...dialog, isOpen: !dialog.isOpen, data })
  }

  return { dialog, recuestAction, toogleDialog, setRecuestAction }
}

export default useOpenDialog
