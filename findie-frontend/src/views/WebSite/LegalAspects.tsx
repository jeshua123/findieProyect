import { useEffect, useState } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'

import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import SectionStructure from '../../layout/WebSite/SectionStructure'
import TermsAndConditions from '../../components/WebSite/LegalAspects/TermsAndConditions'
import PrivacyPolicies from '../../components/WebSite/LegalAspects/PrivacyPolicies'

import { Collapse } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const LegalAspects: React.FC = () => {
  const { view, setView } = useWebSiteLayout()
  const [optionSelected, setOptionSelected] = useState<number>(0)

  const SetLegalOption = (option: number) => {
    if (optionSelected === option) return setOptionSelected(0)
    setOptionSelected(option)
  }

  useEffect(() => {
    setView({ path: 'legal_aspects', bgColor: 'web-bg-light-gray', textColor: 'text-black', textColor2: 'text-light-gray' })
  }, [])

  return (
    <WebSiteStructure>
      <SectionStructure>
        <h1 className={`${view.textColor}`}>
          Aspectos <br /> legales
        </h1>
        <p className='subtitle5-regular mt-6'>Última actualización: 03 mayo, 2022</p>

        <div className={`mt-32 ${view.textColor}`}>
          <h5 className='text-left cursor-pointer' onClick={() => SetLegalOption(1)}>
            1. Términos y condiciones
            {optionSelected === 1 ? (
              <KeyboardArrowDownIcon fontSize='large' className='ml-1' />
            ) : (
              <KeyboardArrowUpIcon fontSize='large' className='ml-1' />
            )}
          </h5>
          <Collapse in={optionSelected === 1}>
            <TermsAndConditions />
          </Collapse>

          <h5 className='text-left cursor-pointer mt-4' onClick={() => SetLegalOption(2)}>
            2. Políticas de privacidad
            {optionSelected === 2 ? (
              <KeyboardArrowDownIcon fontSize='large' className='ml-1' />
            ) : (
              <KeyboardArrowUpIcon fontSize='large' className='ml-1' />
            )}
          </h5>
          <Collapse in={optionSelected === 2}>
            <PrivacyPolicies />
          </Collapse>
        </div>
      </SectionStructure>
    </WebSiteStructure>
  )
}

export default LegalAspects
