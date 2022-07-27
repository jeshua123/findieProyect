import CheckIcon from '@material-ui/icons/Check'

export const industries = [
  { value: '1', name: 'Agropecuario - silvícola' },
  { value: '2', name: 'Pesca' },
  { value: '3', name: 'Minería' },
  { value: '4', name: 'Industria Manufacturera' },
  { value: '5', name: 'Alimentos' },
  { value: '6', name: 'Electricidad, gas y agua' },
  { value: '7', name: 'Construcción' },
  { value: '8', name: 'Comercio' },
  { value: '9', name: 'Restaurantes y hoteles' },
  { value: '10', name: 'Transportes' },
  { value: '11', name: 'Comunicaciones' },
  { value: '12', name: 'Financieros y empresariales' },
  { value: '13', name: 'Vivienda e inmobiliarios' },
  { value: '14', name: 'Educación' },
  { value: '15', name: 'Salud' },
  { value: '16', name: 'Administración pública' },
  { value: '17', name: 'Otro' },
]

export const rangePrice = [
  'Proyecto simple(25.000 – 180.000 CLP)',
  'Proyecto muy pequeño(180.000 – 500.000 CLP)',
  'Proyecto pequeño (500.000 – 1.000.000 CLP)',
  'Proyecto medio (1.000.000 – 2.150.000 CLP)',
  'Proyecto grande (2.150.000 – 3.500.000 CLP)',
  'Proyecto más grande (3.500.000 – 7.000.000 CLP o +)',
]

export const hourPrice = [
  '5.000 CLP valor/hora',
  '6.000 CLP valor/hora',
  '7.000 CLP valor/hora',
  '8.000 CLP valor/hora',
  '9.000 CLP valor/hora',
  '10.000 CLP valor/hora',
  '11.000 CLP valor/hora',
  '12.000 CLP valor/hora',
  '13.000 CLP valor/hora',
  '14.000 CLP valor/hora',
  '15.000 CLP valor/hora',
  '16.000 CLP valor/hora',
  '17.000 CLP valor/hora',
  '18.000 CLP valor/hora',
  '19.000 CLP valor/hora',
  '20.000 CLP valor/hora',
]

// Project evaluation process
export const projectSteps = [
  {
    title: 'Propuesto desde la web',
    step: 'step_one',
    number: 1,
    icon: (
      <div className='w-6 h-6 bg-strong-rose total-center rounded-full'>
        <p className='microcopy text-white'>1</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-strong-rose total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
  {
    title: 'Presupuesto asignado',
    step: 'step_two',
    number: 2,
    icon: (
      <div className='w-6 h-6 bg-sea-blue total-center rounded-full'>
        <p className='microcopy text-white'>2</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-sea-blue total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
  {
    title: 'Stack asignado',
    step: 'step_three',
    number: 3,
    icon: (
      <div className='w-6 h-6 bg-orange total-center rounded-full'>
        <p className='microcopy text-white'>3</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-orange total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
  {
    title: 'Freelancers asignados',
    step: 'step_four',
    number: 4,
    icon: (
      <div className='w-6 h-6 bg-sky-blue total-center rounded-full'>
        <p className='microcopy text-white'>4</p>
      </div>
    ),
    activeIcon: (
      <div className='w-6 h-6 bg-sky-blue total-center rounded-full'>
        <CheckIcon className='text-white' fontSize='small' />
      </div>
    ),
  },
  {
    title: 'Retenciones asignadas',
    step: 'step_five',
    number: 5,
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

export const timeRange = ['Menos de una semana', '1 a 3 meses', '3 a 6 meses', 'Mas de 6 meses']

export const commitmentLevel = ['Tiempo completo (40 o más hrs/semana)', 'Part-time (menos de 40 hrs/semana)', 'Por hora']

export const projectFields: string[] = ['title', 'brief', 'plan', 'freelancer', 'price', 'budget']

export const FreelancerAndCalculator: string[] = ['freelancer', 'price']
