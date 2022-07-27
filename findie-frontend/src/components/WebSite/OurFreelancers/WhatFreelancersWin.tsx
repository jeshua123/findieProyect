import { IWebSiteSection } from '../../../models/IWebSiteSection'
import { WhatFindieOffer } from '../../../constants/WebSite/OurFreelancersConstants'

import SectionStructure from '../../../layout/WebSite/SectionStructure'

const WhatFreelancersWin: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure className='relative' id='what_freelancers_win'>
      <p className={`subtitle2-bold ${props.view.textColor}`}>LO QUE TE OFRECEMOS</p>

      <div className='grid grid-cols-12 md:gap-4 gap-0 mt-12'>
        {WhatFindieOffer.map((iter) => {
          return (
            <div className='lg:col-span-6 col-span-12 mt-4' key={iter.title}>
              <div className={iter.degrade} />
              <h5 className={`${props.view.textColor} md:mt-4 mt-2 lg:w-5/6 w-full`}>{iter.title}</h5>
            </div>
          )
        })}
      </div>
    </SectionStructure>
  )
}

export default WhatFreelancersWin
