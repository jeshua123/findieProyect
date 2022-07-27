import { useState } from 'react'
import { IOptions } from '../../models/IFormStep'
import { UseFormReturn } from 'react-hook-form'

import { ClickAwayListener, Collapse } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

type TSpecialSelect = {
  options: IOptions[]
  name: string
  selectedOption: string
  form: UseFormReturn<any>
  boxSeparation?: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  setTheme: (selectedTheme?: string | undefined) => Record<string, any>
}

const SpecialSelect: React.FC<TSpecialSelect> = (props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleColorValidation = (field: string) => {
    return props.form.watch(field) ? 'client-success-validation' : 'client-error-validation'
  }

  const addItem = (item: string) => {
    props.setSelectedOption(item)
    props.form.setValue(props.name, item)
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className='relative md:mt-8 mt-3'>
        <div
          className={`cursor-pointer px-2 w-full py-3 flex items-center justify-between ${handleColorValidation(props.name)}`}
          onClick={() => setOpen(true)}
        >
          <p className='buttontext4-regular text-white cursor-pointer'>
            {props.selectedOption ? props.selectedOption : 'Selecciona una opción'}
          </p>
          {open ? (
            <KeyboardArrowUpIcon className={props.setTheme().textColor} />
          ) : (
            <KeyboardArrowDownIcon className={props.setTheme().textColor} />
          )}
        </div>

        <Collapse
          in={open}
          className={`border border-white px-4 pt-1 pb-4 md:max-h-48 max-h-56 overflow-y-scroll absolute md:top-14 left-0 w-full z-20 ${
            props.boxSeparation ?? 'top-14'
          } ${props.setTheme().containerBgColor}`}
        >
          <div>
            {props.options.map((item: IOptions, index: number) => {
              return (
                <p
                  key={`${item}${index}`}
                  className={`buttontext4-regular cursor-pointer mt-2 ${props.setTheme().textColor}`}
                  onClick={() => addItem(item.label)}
                >
                  {item.label}
                </p>
              )
            })}
          </div>
        </Collapse>
      </div>
    </ClickAwayListener>
  )
}

export default SpecialSelect
