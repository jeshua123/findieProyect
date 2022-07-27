import {
  clientApplication,
  freelancerApplication,
  sectionTabs,
  TEntity,
  TSectionTab,
  TTabValue,
  whatClientSection,
  whatFreelancerSection,
} from '../../../constants/WebSite/HowWorksConstants'
import SectionStructure from '../../../layout/WebSite/SectionStructure'
import { IWebSiteSection } from '../../../models/IWebSiteSection'

import animation from '../../../assets/images/web/how-works/freelancer-animation.gif'
import { useState } from 'react'
import {
  TWhyChooseFindieTable,
  WhyChooseFindieTableDesktop,
  WhyChooseFindieTableMobile,
} from '../../../shared/WhyChooseFindieTable/WhyChooseFindieTable'
import { clientTable, freelancerTable } from '../../../constants/WebSite/HomePageConstants'
import HowSection from './HowSection'
import WhatSection from './WhatSection'
import FiButton from '../../../assets/UIkit/FiButton'
import routes from '../../../constants/routes'
import WebSiteStructure from '../../../layout/WebSite/WebSiteStructure'

const HowWorksSections: React.FC<IWebSiteSection> = (props) => {
  const [selectedSection, setSelectedSection] = useState<TTabValue>('why')
  const [entityTab, setEntityTab] = useState<TEntity>('client')
  const [entityTable, setEntityTable] = useState(clientTable)
  const [howWorksSection, setHowWorksSection] = useState(clientApplication)
  const [whatList, setWhatList] = useState(whatClientSection)

  const selectSectionTab = (type: TEntity) => {
    setEntityTab(type)
    setEntityTable(type === 'client' ? clientTable : freelancerTable)
    setHowWorksSection(type === 'client' ? clientApplication : freelancerApplication)
    setWhatList(type === 'client' ? whatClientSection : whatFreelancerSection)
  }

  const entityDefaulProps: TWhyChooseFindieTable = {
    theme: 'transparent',
    textColor: props.view.textColor,
    selectedTab: entityTab,
    table: entityTable,
  }

  return (
    <>
      <WebSiteStructure>
        <SectionStructure id='freelancer_selection'>
          <div className='flex justify-between mt-6'>
            {sectionTabs.map((tab: TSectionTab) => {
              const selectedStyles = selectedSection === tab.value ? 'border-b border-white pb-2' : ''

              return (
                <p className={`subtitle2-bold cursor-pointer ${selectedStyles}`} onClick={() => setSelectedSection(tab.value)}>
                  {tab.label}
                </p>
              )
            })}
          </div>

          <div className='lg:flex hidden justify-between items-center mt-6 px-4 mb-12'>
            <p
              className={`subtitle1-medium cursor-pointer ${entityTab === 'client' ? 'border-b border-white pb-2' : ''}`}
              onClick={() => selectSectionTab('client')}
            >
              Soy cliente
            </p>
            <img src={animation} alt='amination' className='my-8' style={{ width: 334, height: 138 }} />
            <p
              className={`subtitle1-medium cursor-pointer ${entityTab === 'freelancer' ? 'border-b border-white pb-2' : ''}`}
              onClick={() => selectSectionTab('freelancer')}
            >
              Soy freelancer
            </p>
          </div>

          <div className='lg:hidden block mt-12'>
            <img src={animation} alt='amination' className='' style={{ width: 334, height: 138 }} />
            <div className='flex justify-between items-center mt-12 px-4 mb-12'>
              <p
                className={`subtitle1-medium cursor-pointer ${entityTab === 'client' ? 'border-b border-white pb-2' : ''}`}
                onClick={() => selectSectionTab('client')}
              >
                Soy cliente
              </p>
              <p
                className={`subtitle1-medium cursor-pointer ${entityTab === 'freelancer' ? 'border-b border-white pb-2' : ''}`}
                onClick={() => selectSectionTab('freelancer')}
              >
                Soy freelancer
              </p>
            </div>
          </div>

          {selectedSection === 'why' && (
            <>
              <WhyChooseFindieTableDesktop {...entityDefaulProps} />
              <WhyChooseFindieTableMobile {...entityDefaulProps} />
            </>
          )}
          {selectedSection === 'how' && <HowSection roadmap={howWorksSection} textColor={props.view.textColor} />}
          {selectedSection === 'what' && <WhatSection whatList={whatList} textColor={props.view.textColor} />}
        </SectionStructure>
      </WebSiteStructure>

      <div className='grid grid-cols-12 md:gap-8 gap-6 bg-soft-blue md:py-20 py-12'>
        <h2 className='col-span-12 text-white text-center'>No esperes más,</h2>
        <div className='md:col-span-6 col-span-12 md:justify-self-end justify-self-center'>
          <FiButton className='border-none px-4' theme='light' to={routes.web_site.freelancer_suscription_form.step_zero} asLink>
            <p className='buttontext1-medium'>Postula como freelancer</p>
          </FiButton>
        </div>
        <div className='md:col-span-6 col-span-12 md:justify-self-start justify-self-center'>
          <FiButton className='px-4' theme='secondary' to={routes.web_site.client_suscription_form.step_zero} asLink>
            <p className='buttontext1-medium'> Encuentra a tu freelancer</p>
          </FiButton>
        </div>
      </div>
    </>
  )
}

export default HowWorksSections
