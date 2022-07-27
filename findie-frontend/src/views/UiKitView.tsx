import FiButton from '../assets/UIkit/FiButton'
import Tabs from '../assets/UIkit/Tabs'
import FindieGifIsotype from '../shared/Brand/Isotype/FindieGifIsotype'
import FindieIsotype from '../shared/Brand/Isotype/FindieIsotype'
import FindieLogo from '../shared/Brand/Logo/FindieLogo'

const tabs = [
  {
    id: 1,
    text: `Tab 1`,
    isSelected: true,
    action: () => {},
  },
  {
    id: 2,
    text: `Tab 2`,
    isSelected: true,
    action: () => {},
  },
  {
    id: 3,
    text: `Tab 3`,
    isSelected: true,
    action: () => {},
  },
]

const UiKitView = () => {
  return (
    <div className='p-8'>
      <h4 className='mb-8'>Buttons</h4>
      <div className='grid grid-cols-12'>
        <div className='col-span-4'>
          <p className='body2-medium'>FiButtom</p>
          <FiButton>Primary-contained</FiButton>
        </div>
        <div className='col-span-4'>
          <p className='body2-medium'>FiButtom variant='outlined'</p>
          <FiButton variant='outlined'>Primary-outliden</FiButton>
        </div>
        <div className='col-span-4'>
          <p className='body2-medium'>FiButtom variant='default'</p>
          <FiButton>Primary-default</FiButton>
        </div>
        <div className='col-span-4'>
          <p className='body2-medium'>FiButtom theme='light' (Freelancer/client custom form)</p>
          <FiButton theme='light'>Light-contained</FiButton>
        </div>
      </div>
      <hr className='my-8' />

      <h4 className='mb-8'>Tabs</h4>
      <Tabs tabs={tabs} />
      <hr className='my-8' />

      <h4 className='mb-8'>Brand</h4>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-span-4'>
          <p className='body2-medium'>Logo black</p>
          <FindieLogo className='w-30 h-12' />
        </div>
        <div className='col-span-4 bg-black'>
          <p className='body2-medium text-black'>Logo white</p>
          <FindieLogo color='white' />
        </div>
        <div className='col-span-4'>
          <p className='body2-medium'>Isotype</p>
          <FindieIsotype />
        </div>
        <div className='col-span-4'>
          <p className='body2-medium'>Contained white gif isotype</p>
          <FindieGifIsotype className='w-10 h-10' variant='contained-white' />
        </div>
        <div className='col-span-4'>
          <p className='body2-medium'>Contained black gif isotype</p>
          <FindieGifIsotype className='w-10 h-10' variant='contained-black' />
        </div>
      </div>
    </div>
  )
}

export default UiKitView
