import { useState } from 'react'
import { Collapse, useMediaQuery } from '@material-ui/core'
import { termsConditions } from '../../../constants/WebSite/TermsConditionsConstant'

const TermsAndConditions: React.FC = () => {
  const isTabletMobile = useMediaQuery('(max-width:800px)')
  const [currentTopic, setCurrentTopic] = useState<string>('')

  const handleCurrentTopic = (title: string) => {
    if (!isTabletMobile) return
    if (title === currentTopic) return setCurrentTopic('')
    setCurrentTopic(title)
  }

  return (
    <div className='mb-12'>
      {termsConditions.map((condition, index) => {
        return (
          <div key={condition.title + index}>
            <h5
              className={`mt-8 ${currentTopic === condition.title ? 'underline' : ''}`}
              onClick={() => handleCurrentTopic(condition.title)}
            >
              {condition.title}
            </h5>
            <Collapse in={currentTopic === condition.title || !isTabletMobile}>
              <p className='body2-regular'>{condition.content}</p>
              {condition.contentExtended?.map((content, index) => {
                return (
                  <div key={content.subtitle + index}>
                    <p className='body2-regular mt-7'>{content.subtitle}</p>
                    <p className='body2-regular mt-7 whitespace-pre-wrap'>{content.subContent}</p>
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

export default TermsAndConditions
