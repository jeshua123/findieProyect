import { FC } from 'react'

type THowSection = {
  roadmap: any
  textColor: string
}

const HowSection: FC<THowSection> = (props) => {
  return (
    <div className='w-full'>
      <p className={`subtitle5-regular ${props.textColor}`}>Te mostramos el proceso de selección: </p>

      <div className='grid grid-cols-12 md:gap-12 gap-0 lg:w-11/12 w-full'>
        {props.roadmap.map((iter: any, index: number) => {
          return (
            <div
              key={iter.title + index}
              className={`lg:col-span-4 col-span-12 flex lg:flex-col flex-row mt-8 ${props.textColor}`}
            >
              <h4 className={`lg:text-center text-left ${iter.stepColor}`}>{iter.step}</h4>
              <div className='mt-4 lg:ml-0 ml-4'>
                <p className='subtitle1-medium'>{iter.title}</p>
                <p className={`body2-regular lg:mt-8 mt-4 ${props.textColor}`}>{iter.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HowSection
