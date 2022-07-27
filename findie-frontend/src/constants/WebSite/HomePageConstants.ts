//Roadmap view
export const roadMap = [
  {
    title: 'Cuéntanos tu necesidad',
    content:
      'Trabajaremos contigo para entender tus necesidades y objetivos: contrata un freelancer o arma un equipo multidisciplinario, todo desde Findie.',
    step: 1,
    isNotLastStep: true,
  },
  {
    title: 'Candidatos selectos',
    content:
      'Podrás seleccionar tu mismo al freelancer o bien elegir que Findie haga la selección por ti. Nuestros freelancers han sido preseleccionados asegurándote calidad y profesionalismo.',
    step: 2,
    isNotLastStep: true,
  },
  {
    title: 'Arma un equipo multidisciplinario',
    content: 'Alimentemos a dos pajaritos con un panecillo, te regalamos beneficios a la hora de querer formar un equipo.',
    step: 3,
    isNotLastStep: false,
  },
]
//Featured freelancers view
export const sliderSettings = (slides: number) => {
  return {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: slides > 2 ? 3 : slides,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 435,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
}
//Why chooce us view
export const whyUsTab = [
  { title: 'Soy cliente', value: 'client' },
  { title: 'Soy freelancer', value: 'freelancer' },
]

export const clientTable = [
  {
    plan: 'Candidatos pre-seleccionados',
    findie: 'check',
    job: 'unCheck',
    others: 'unCheck',
  },
  {
    plan: 'Garantía de calidad',
    findie: 'check',
    job: 'unCheck',
    others: 'unCheck',
  },
  {
    plan: 'Tiempo en encontrar un candidato idóneo',
    findie: '0-3 semanas',
    job: '1-4 meses',
    others: '1-4 meses',
  },
  {
    plan: 'Costos de término de contrato',
    findie: 'ninguno',
    job: 'muy altos',
    others: 'ninguno',
  },
  {
    plan: 'Armar equipos multidisciplinarios',
    findie: 'rápido',
    job: 'lento',
    others: 'pocas lo tienen',
  },
  {
    plan: 'Depósito inicial reembolsable',
    findie: 'check',
    job: 'unCheck',
    others: 'solo el 1% ofrece',
  },
]

export const freelancerTable = [
  {
    plan: 'Protección al freelancer',
    findie: 'check',
    job: 'unCheck',
    others: 'unCheck',
  },
  {
    plan: 'Visibilidad alta',
    findie: 'check',
    job: 'unCheck',
    others: 'unCheck',
  },
  {
    plan: 'Llegar a públicos/nichos nuevos',
    findie: 'check',
    job: 'unCheck',
    others: 'sí, pero más lento',
  },
  {
    plan: 'Tratar con clientes serios',
    findie: 'check',
    job: 'no siempre',
    others: 'unCheck',
  },
  {
    plan: 'Pertenecer a comunidad insigne',
    findie: 'check',
    job: 'unCheck',
    others: 'muy pocas',
  },
  {
    plan: 'Freelancer se encarga del cobro',
    findie: 'unCheck',
    job: 'check',
    others: 'unCheck',
  },
]
