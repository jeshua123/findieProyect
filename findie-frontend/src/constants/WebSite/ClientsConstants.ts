export const howWorksMap = [
  {
    title: 'Contacto inicial',
    content: 'Completa el formulario de contacto y cuéntanos cuáles son tus necesidades.',
    step: 1,
    isNotLastStep: true,
  },
  {
    title: 'Brief del proyecto',
    content: 'Describe el proyecto: tareas, rango de presupuesto, plazo de tiempo con el que cuentas.',
    step: 2,
    isNotLastStep: true,
  },
  {
    title: 'Búsqueda de freelancers',
    content: `Dependiendo del plan que elijas tú o Findie hará la búsqueda.`,
    step: 3,
    isNotLastStep: true,
  },
  {
    title: 'Depósito inicial reembolsable',
    content:
      'Una vez aprobado el presupuesto del freelancer, tendrás que hacer un depósito inicial del 25-50% del valor total del proyecto que servirá como abono.',
    step: 4,
    isNotLastStep: false,
  },
]

export const clientBenefits = [
  {
    title: 'Freelancers pre-seleccionados',
    subtitle: 'Findie se toma el tiempo de hacer un filtro previo para asegurar profesionales de calidad.',
    degrade: 'client-degrade-1',
  },
  {
    title: 'Ahorra tiempo',
    subtitle: 'La búsqueda de tu candidato ideal se demora menos de lo que usualmente toma una agencia de reclutamiento.',
    degrade: 'client-degrade-2',
  },
  {
    title: 'Sin complicaciones ',
    subtitle:
      'Con nosotros no tienes que preocuparte por las ataduras legales, gastos de RRHH, papeleo, cotizaciones y finiquitos.',
    degrade: 'client-degrade-3',
  },
  {
    title: 'Pago seguro',
    subtitle: 'Retenemos el depósito inicial hasta que des el O.K o te lo devolvemos integralmente si no has quedado conforme. ',
    degrade: 'client-degrade-4',
  },
]

export const plansPrices = [
  {
    planName: `Findie 
Lite`,
    planId: 'Findie Lite',
    modality: 'Gratuito por siempre',
    ModalityComment: 'Publica tu oferta y espera a que un freelancer Findie te contacte.',
    benefits: ['Freelancers pre-seleccionados', 'Pago seguro', 'Atención al cliente'],
    price: '$ 0',
    buttonText: 'Elijo Lite',
  },
  {
    planName: `Findie 
Search`,
    planId: 'Findie Search',
    modality: 'Por búsqueda',
    ModalityComment: 'Directo al grano. La búsqueda será asistida por Findie.',
    benefits: [
      'Búsqueda personalizada',
      'Lista corta de candidatos',
      'Asistencia en llenado de brief',
      'Entrevista videollamada',
    ],
    price: '2 UF',
    buttonText: 'Elijo Search',
  },
  {
    planName: `Findie 
Search Pro`,
    planId: 'Findie Search Pro',
    modality: 'Por proyecto',
    ModalityComment: 'Búsqueda asistida para proyectos con 2 o más freelancers.',
    benefits: ['Prioridad de búsqueda', 'Coordinación de equipos multidisciplinarios'],
    price: '5 UF',
    buttonText: 'Elijo Search Pro',
  },
  {
    planName: `Findie 
Multi project`,
    planId: 'Findie Multi project',
    modality: 'Por 1 mes',
    ModalityComment: 'Búsquedas ilimitadas con todos los beneficios.',
    benefits: ['Manager dedicado', 'Búsquedas ilimitadas'],
    price: '8 UF',
    buttonText: 'Elijo Multi project',
  },
]
