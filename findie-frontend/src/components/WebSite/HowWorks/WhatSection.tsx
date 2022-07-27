import { FC } from 'react'

type TWhatSection = {
  whatList: any
  textColor: string
}

const WhatSection: FC<TWhatSection> = (props) => {
  return (
    <div className='lg:w-1/2 md:w-9/11 w-full'>
      {props.whatList.map((item: any) => {
        return (
          <div key={item.title} className='mt-8'>
            <p className='subtitle1-medium'>{item.title}</p>
            <p className='body2-regular mt-4'>{item.subtitle}</p>
          </div>
        )
      })}
    </div>
  )
}

export default WhatSection
