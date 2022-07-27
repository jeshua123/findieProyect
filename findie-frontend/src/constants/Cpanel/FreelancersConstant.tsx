import CheckIcon from '@material-ui/icons/Check'

export const personalFields: string[] = [
  'createdAt',
  'name',
  'lastName',
  'nationality',
  'address',
  'birthdate',
  'email',
  'phone',
  'invitation_ticket',
  'plan',
  'category',
  'portfolio_link',
  'skills',
  'portfolio',
  'cv',
  'avatar',
]

//Freelancer evaluation
export const freelancerSteps = [
  {
    title: 'Formulario recibido',
    step: 'step-one',
    number: 1,
    icon: (
      <div className='w-6 h-6 bg-black-005 total-center rounded-full'>
        <p className='microcopy text-white'>1</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-black-005 total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
  {
    title: 'Entrevista y Test',
    step: 'step-two',
    number: 2,
    icon: (
      <div className='w-6 h-6 bg-strong-rose total-center rounded-full'>
        <p className='microcopy text-white'>5</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-strong-rose total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
  {
    title: 'Registrar',
    step: 'step-three',
    number: 3,
    icon: (
      <div className='w-6 h-6 bg-soft-green total-center rounded-full'>
        <p className='microcopy text-white'>5</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-soft-green total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
]
