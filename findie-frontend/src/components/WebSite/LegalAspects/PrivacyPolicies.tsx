import { useState } from 'react'
import { privacyPolicies } from '../../../constants/WebSite/TermsConditionsConstant'

import { Collapse, useMediaQuery } from '@material-ui/core'

const PrivacyPolicies: React.FC = () => {
  const isTabletMobile = useMediaQuery('(max-width:800px)')
  const [currentTopic, setCurrentTopic] = useState<string>('')

  const handleCurrentTopic = (title: string) => {
    if (!isTabletMobile) return
    if (title === currentTopic) return setCurrentTopic('')
    setCurrentTopic(title)
  }

  return (
    <div className='mb-12'>
      {privacyPolicies.map((policie, pIndex) => {
        return (
          <div key={policie.title + pIndex}>
            <h5
              className={`mt-8 ${currentTopic === policie.title ? 'underline' : ''}`}
              onClick={() => handleCurrentTopic(policie.title)}
            >
              {policie.title}
            </h5>

            <Collapse in={currentTopic === policie.title || !isTabletMobile}>
              <p className='body2-regular mt-7 whitespace-pre-wrap'>{policie.content}</p>

              {policie.terms &&
                policie.terms.map((term, tIndex) => {
                  return (
                    <div key={term.subtitle + tIndex}>
                      <p className='body2-medium mt-7 whitespace-pre-wrap'>{term.subtitle}</p>
                      {term.options.map((option, oIndex) => {
                        return (
                          <div key={option.optionTitle + oIndex}>
                            <p className='body2-medium mt-5 whitespace-pre-wrap'>{option.optionTitle}</p>
                            <p className='body2-regular mt-7 whitespace-pre-wrap'>{option.optionContent}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}

              <p className='body2-regular mt-7 whitespace-pre-wrap'>{policie.subtitle2}</p>

              {policie.options2?.map((option, oIndex) => {
                return (
                  <div key={option.optionTitle + oIndex}>
                    <p className='body2-medium mt-5 whitespace-pre-wrap'>{option.optionTitle}</p>
                    <p className='body2-regular mt-7 whitespace-pre-wrap'>{option.optionContent}</p>
                  </div>
                )
              })}
            </Collapse>
          </div>
        )
      })}
    </div>
  )
}

export default PrivacyPolicies
