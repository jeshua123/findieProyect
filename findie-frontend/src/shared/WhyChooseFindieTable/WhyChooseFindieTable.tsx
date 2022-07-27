import { FC } from 'react'

import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

export type TWhyChooseFindieTable = {
  textColor: string
  selectedTab: 'client' | 'freelancer' | string
  table: any
  theme: 'white' | 'transparent'
}

export const WhyChooseFindieTableDesktop: FC<TWhyChooseFindieTable> = (props) => {
  return (
    <div className='lg:block hidden mt-16'>
      <div className='grid grid-cols-12 h-20'>
        <div className='col-span-3'></div>
        <div className={`col-span-3 total-center ${props.theme === 'white' ? 'bg-white text-black' : 'text-white'}`}>
          <h3 className='text-center'>Findie</h3>
        </div>
        <div className='col-span-3 total-center px-4'>
          <h5 className={`text-center ${props.textColor}`}>
            {props.selectedTab === 'client' ? 'Empleo tradicional' : 'Freelancing autónomo'}
          </h5>
        </div>
        <div className='col-span-3 total-center px-4'>
          <h5 className={`text-center ${props.textColor}`}>Otras plataformas</h5>
        </div>
      </div>

      {props.table.map((row: any, i: number) => {
        const selectedStyle = i !== props.table.length - 1 ? 'border-b border-white' : ''

        return (
          <div key={row.plan} className='grid grid-cols-12 h-20'>
            <div className={`col-span-3 ${selectedStyle} flex items-center pr-4`}>
              <p className={`subtitle6-medium col-span-3 ${props.textColor}`}>{row.plan}</p>
            </div>
            <div
              className={`col-span-3 total-center 
                ${props.theme === 'white' ? 'bg-white text-black' : 'text-white '}
                ${i !== props.table.length - 1 && props.theme === 'transparent' ? 'border-b border-white' : ''}
              `}
            >
              {row.findie === 'check' && <CheckIcon fontSize='large' className='text-blue' />}
              {row.findie === 'unCheck' && <CloseIcon fontSize='large' className='text-blue' />}
              {row.findie !== 'check' && row.findie !== 'unCheck' && <p className='subtitle4-regular text-blue'>{row.findie}</p>}
            </div>
            <div className={`col-span-3 total-center ${i !== props.table.length - 1 && 'border-b border-white'}`}>
              {row.job === 'check' && <CheckIcon fontSize='large' className={'text-white'} />}
              {row.job === 'unCheck' && <CloseIcon fontSize='large' className='text-white' />}
              {row.job !== 'check' && row.job !== 'unCheck' && (
                <p className={`subtitle4-regular ${props.textColor}`}>{row.job}</p>
              )}
            </div>
            <div className={`col-span-3 total-center ${i !== props.table.length - 1 && 'border-b border-white'}`}>
              {row.others === 'check' && <CheckIcon fontSize='large' className='text-white' />}
              {row.others === 'unCheck' && <CloseIcon fontSize='large' className='text-white' />}
              {row.others !== 'check' && row.others !== 'unCheck' && (
                <p className={`subtitle4-regular ${props.textColor}`}>{row.others}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const WhyChooseFindieTableMobile: FC<TWhyChooseFindieTable> = (props) => {
  return (
    <div className='lg:hidden block mb-20'>
      {props.table.map((row: any) => {
        return (
          <div key={row.plan} className='grid grid-cols-12 md:mt-6 mt-4'>
            <div
              className={`col-span-12 py-3 total-center ${props.theme === 'white' ? 'bg-sea-blue-096 ' : ''} ${props.textColor}`}
            >
              <h5 className='text-center'>{row.plan}</h5>
            </div>
            <div
              className={`col-span-4 md:h-16 h-12 total-center border-b border-white ${
                props.theme === 'white' ? 'bg-white text-black' : 'text-white'
              }`}
            >
              <h3>Findie</h3>
            </div>
            <div className='col-span-4 md:h-16 h-12 total-center border-b border-white'>
              <p className={`subtitle6-medium text-center ${props.textColor}`}>
                {props.selectedTab === 'client' ? 'Empleo tradicional' : 'Freelancing autónomo'}
              </p>
            </div>
            <div className='col-span-4 md:h-16 h-12 total-center border-b border-white'>
              <p className={`subtitle6-medium text-center ${props.textColor}`}>Otras plataformas</p>
            </div>
            <div
              className={`col-span-4 md:h-16 h-12 total-center ${props.theme === 'white' ? 'bg-white text-black' : 'text-blue'}`}
            >
              {row.findie === 'check' && <CheckIcon className='text-blue' />}
              {row.findie === 'unCheck' && <CloseIcon className='text-white' />}
              {row.findie !== 'check' && row.findie !== 'unCheck' && <p className={`subtitle6-regular`}>{row.findie}</p>}
            </div>
            <div className='col-span-4 md:h-16 h-12 total-center'>
              {row.job === 'check' && <CheckIcon className='text-blue' />}
              {row.job === 'unCheck' && <CloseIcon className='text-white' />}
              {row.job !== 'check' && row.job !== 'unCheck' && (
                <p className={`subtitle6-regular ${props.textColor}`}>{row.job}</p>
              )}
            </div>
            <div className='col-span-4 md:h-16 h-12 total-center'>
              {row.others === 'check' && <CheckIcon className='text-blue' />}
              {row.others === 'unCheck' && <CloseIcon className='text-white' />}
              {row.others !== 'check' && row.others !== 'unCheck' && (
                <p className={`subtitle6-regular text-center ${props.textColor}`}>{row.others}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
