import { IWebSiteSection } from '../../../models/IWebSiteSection'

import SectionStructure from '../../../layout/WebSite/SectionStructure'
import FindieGifIsotype from '../../../shared/Brand/Isotype/FindieGifIsotype'
import { WhatFreelancersGet } from '../../../constants/WebSite/OurFreelancersConstants'

const WhatYouGet: React.FC<IWebSiteSection> = (props) => {
  return (
    <SectionStructure className='relative' id='what_you_get'>
      <p className={`subtitle2-bold md:text-right text-left mt-8 ${props.view.textColor}`}>LO QUE QUEREMOS PARA TI</p>
      <div className='grid grid-cols-12 mt-4'>
        {WhatFreelancersGet.map((iter) => {
          return (
            <div
              key={iter.title}
              className={`col-span-12 ${iter.grid} flex lg:items-center items-start md:mt-4 mt-8 lg:-ml-0 -ml-4`}
            >
              <FindieGifIsotype variant='default' className='md:w-28 md:h-28 w-12 h-12 md:mb-4 mb-6' />
              <h5 className={`${props.view.textColor} lg:ml-4 md:ml-6 ml-4 lg:w-96 md:w-9/12 w-full lg:mt-0 md:mt-6 mt-0.5`}>
                {iter.title}
              </h5>
            </div>
          )
        })}
      </div>
    </SectionStructure>
  )
}

export default WhatYouGet
