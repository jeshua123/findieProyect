import { useState } from 'react'
import { clientTable, freelancerTable, whyUsTab } from '../../../constants/WebSite/HomePageConstants'
import { IWebSiteSection } from '../../../models/IWebSiteSection'

import {
  WhyChooseFindieTableDesktop,
  WhyChooseFindieTableMobile,
} from '../../../shared/WhyChooseFindieTable/WhyChooseFindieTable'
import WebSiteStructure from '../../../layout/WebSite/WebSiteStructure'
import SectionStructure from '../../../layout/WebSite/SectionStructure'

const WhyChooseUs: React.FC<IWebSiteSection> = (props) => {
  const [selectedTab, setSelectedTab] = useState<string>('client')
  const [table, setTable] = useState(clientTable)
  const border = props.view.textColor.includes('text-black') ? 'border-b border-black' : 'border-b border-white'

  const selectTable = (type: string) => {
    setSelectedTab(type)
    setTable(type === 'client' ? clientTable : freelancerTable)
  }

  return (
    <>
      <WebSiteStructure>
        <SectionStructure className='py-0' id='why_choose_us'>
          <p className={`subtitle2-bold ${props.view.textColor}`}>POR QUÉ ELEGIRNOS</p>

          <div className='flex mt-8'>
            {whyUsTab.map((tab: any) => {
              const selectedStyles = selectedTab === tab.value && border
              return (
                <p
                  key={tab.value}
                  className={`subtitle1-medium md:mr-12 mr-4 pb-3 cursor-pointer inline ${props.view.textColor} ${selectedStyles}`}
                  onClick={() => selectTable(tab.value)}
                >
                  {tab.title}
                </p>
              )
            })}
          </div>

          <WhyChooseFindieTableDesktop theme='white' textColor={props.view.textColor} selectedTab={selectedTab} table={table} />
        </SectionStructure>
      </WebSiteStructure>

      <WhyChooseFindieTableMobile theme='white' textColor={props.view.textColor} selectedTab={selectedTab} table={table} />
    </>
  )
}

export default WhyChooseUs
