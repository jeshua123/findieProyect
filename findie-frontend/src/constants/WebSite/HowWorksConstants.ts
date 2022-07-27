export type TTabValue = 'why' | 'how' | 'what'
export type TEntity = 'client' | 'freelancer'
export type TSectionTab = { value: TTabValue; label: string }

export const sectionTabs: TSectionTab[] = [
  { value: 'why', label: 'POR QUÉ' },
  { value: 'how', label: 'CÓMO' },
  { value: 'what', label: 'QUÉ' },
]

export const freelancerApplication = [
  {
    step: '1.',
    title: 'Revisión de solicitud',
    content: 'Chequeamos el curriculum, historial de trabajo, logros, portafolio, repositorios, experiencia formal y no formal.',
    stepColor: 'text-sea-blue',
  },
  {
    step: '2.',
    title: 'Personalidad y expertiz',
    content:
      'Entrevistamos al candidato para profundizar en su curriculum, proyectos y personalidad. Buscamos profesionales comprometidos, motivados, y alineados a nuestra filosofía.',
    stepColor: 'text-soft-blue',
  },
  {
    step: '3.',
    title: 'Presentación en vivo',
    content:
      'Tendrán que explicar en vivo el desarrollo de algún proyecto que hayan realizado, mostrando el proceso con imágenes, videos, etc.',
    stepColor: 'text-orange',
  },
]

export const clientApplication = [
  {
    step: '1.',
    title: 'Formulario de bienvenida',
    content:
      'El primer contacto con la plataforma es a través de un formulario que irá haciéndoles preguntas sobre sus necesidades.',
    stepColor: 'text-sea-blue',
  },
  {
    step: '2.',
    title: 'Completar el brief',
    content: 'El paso más importante. Tendrán que describir con detalle los requerimientos para su proyecto.',
    stepColor: 'text-soft-blue',
  },
  {
    step: '3.',
    title: 'Depósito inicial reembolsable',
    content:
      'Antes de comenzar a trabajar con el freelancer, todo cliente tendrá que hacer un depósito que será abonado a la totalidad del proyecto. Esto nos asegura que las intenciones del cliente sean serias y protege a nuestros freelancers.',
    stepColor: 'text-orange',
  },
]

export const whatClientSection = [
  {
    title: 'Freelancers pre-seleccionados',
    subtitle: 'Nos tomamos el tiempo de hacer un filtro previo para asegurar que tenemos profesionales serios y de calidad.',
  },
  {
    title: 'Ahorra tiempo',
    subtitle: 'La búsqueda de tu candidato ideal se demora menos de lo que usualmente toma una agencia de reclutamiento.',
  },
  {
    title: 'Sin complicaciones ',
    subtitle:
      'Con nosotros no tienes que preocuparte por las ataduras legales, gastos de RRHH, papeleo, cotizaciones y finiquitos.',
  },
  {
    title: 'Pago seguro',
    subtitle: 'Retenemos el depósito inicial hasta que des el O.K o te lo devolvemos integralmente si no has quedado conforme. ',
  },
]

export const whatFreelancerSection = [
  {
    title: 'Trabajar en lo que amas y eres experto',
    subtitle: 'En Findie velamos por conseguirte clientes que estén en línea con tus intereses y gustos.',
  },
  {
    title: 'No preocuparte por los pagos',
    subtitle: 'Findie se encarga de cobrar al cliente.',
  },
  {
    title: 'Ampliar tu red de contactos',
    subtitle: 'Tendrás la oportunidad de colaborar con otros profesionales y de agrandar tu cartera de clientes.',
  },
  {
    title: 'Presentarte clientes serios',
    subtitle: 'Para tu tranquilidad cada cliente tendrá que hacer un depósito inicial antes de empezar con el proyecto.',
  },
]
