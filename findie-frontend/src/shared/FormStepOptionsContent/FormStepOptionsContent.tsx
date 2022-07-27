import { useState } from 'react'

import { withStyles, Theme } from '@material-ui/core/styles'
import { ClickAwayListener, Tooltip } from '@material-ui/core'
import InputField from '../../assets/UIkit/Forms/InputField'
import alert from '../../assets/images/web/client-form/alert.png'
import FormStepContainer from '../FormStepContainer/FormStepContainer'
import useFormSteps from '../../customHooks/useFormSteps'
import { IUseFormSteps } from '../../models/IFormStep'

type option = {
  value: string
  label: string
  comment?: string
  isOtherCategory?: boolean
}

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.white,
    boxShadow: theme.shadows[1],
    color: 'black',
    fontFamily: 'WorkSans-Regular',
    fontSize: 14,
    maxWidth: 367,
    borderRadius: 31,
    padding: '.5rem 1rem',
  },
}))(Tooltip)

const defaultOption = { value: '', label: '', comment: '' }

const FormStepOptionsContent: React.FC<IUseFormSteps> = (props) => {
  const { form, storage } = useFormSteps({ ...props })
  const [tooltip, setTooltip] = useState<option>(defaultOption)

  const onClose = () => {
    tooltip.label && setTooltip({ ...tooltip, label: '' })
  }

  return (
    <FormStepContainer>
      <p className={`formtext1-regular xl:mb-16 lg:mb-16 md:mb-14 mb-12 ${props.setTheme().textColor}`}>{props.title}</p>

      {props?.options &&
        props.options.map((option: option, index: number) => {
          return (
            <div key={`${option.label}${index}`} className='flex items-center md:mb-0 mb-6'>
              <InputField
                name={props.name}
                id={`${option.value}${index}`}
                inputProps={{
                  className: 'no-height lg:mr-4 mr-8 inline mt-2',
                  type: 'radio',
                  value: option.value,
                }}
                form={form}
              />
              <label
                className={`flex items-center formtext1-regular cursor-pointer ${props.setTheme().textColor}`}
                htmlFor={`${option.value}${index}`}
              >
                {option.label}
                {props?.withComments && option.comment && (
                  <>
                    <div className='lg:block hidden'>
                      <LightTooltip title={option.comment ?? ''} placement='top'>
                        <img src={alert} alt='cancel' className='ml-4 mb-3' />
                      </LightTooltip>
                    </div>
                    <div className='lg:hidden block'>
                      <ClickAwayListener mouseEvent={false} onClickAway={onClose}>
                        <div>
                          <LightTooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            open={tooltip.label === option.label}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={tooltip.comment ?? ''}
                            placement='top'
                          >
                            <img src={alert} alt='cancel' className='ml-4 mb-3' onClick={() => setTooltip(option)} />
                          </LightTooltip>
                        </div>
                      </ClickAwayListener>
                    </div>
                  </>
                )}
              </label>
              {storage.item?.categorySelected?.is_other_category && option.isOtherCategory && (
                <InputField
                  className={`ml-4 ${props.setTheme().borderBottom}`}
                  name='proposed_options.category'
                  inputProps={{
                    className: 'border-none bg-transparent',
                    placeholder: 'Escribe una categoría',
                  }}
                  form={form}
                />
              )}
            </div>
          )
        })}
    </FormStepContainer>
  )
}

export default FormStepOptionsContent
