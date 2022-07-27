const routes = {
  auth: {
    login: '/login',
    forgot_password: '/olvide-contraseña',
    recover_password: '/recuperar-contraseña',
  },
  web_site: {
    home: '/',
    about_us: '/sobre-findie',
    how_works: '/como-funciona',
    our_freelancers: '/freelancers',
    our_clients: '/clientes',
    freelancers_profiles: '/perfiles-freelancers',
    freelancer_profile: '/perfil',
    faqs: '/preguntas-frecuentes',
    terms_conditions: '/aspectos-legales',
    client_suscription_form: {
      index: '/inscripcion-cliente',
      step_zero: '/inscripcion-cliente/paso/0',
      form_steps: '/inscripcion-cliente/paso',
      step_eight: '/inscripcion-cliente/paso/8',
    },
    freelancer_suscription_form: {
      index: '/inscripcion-freelancer',
      step_zero: '/inscripcion-freelancer/paso/0',
      form_steps: '/inscripcion-freelancer/paso',
      step_five: '/inscripcion-freelancer/paso/5',
    },
  },
  cpanel: {
    index: '/cpanel',
    profile: '/cpanel/perfil',
    dashboard: '/cpanel/dashboard',
    freelancers: {
      index: '/cpanel/freelancers',
      register: '/cpanel/freelancers/registro',
      postulations: '/cpanel/freelancers/postulantes',
      findie: '/cpanel/freelancers/freelancers-findie',
      findie_featured: '/cpanel/freelancers/freelancers-findie-destacados',
    },
    clients: {
      index: '/cpanel/clientes',
      register: '/cpanel/clientes/registro',
      postulations: '/cpanel/clientes/postulantes',
      findie: '/cpanel/clientes/clientes-findie',
    },
    assets: {
      index: '/cpanel/assets',
      categories: '/cpanel/assets/categorias',
      skills: '/cpanel/assets/habilidades',
      plans: '/cpanel/assets/planes',
      payment_methods: '/cpanel/assets/metodos-pago',
    },
    project: {
      new: '/proyectos/nuevo-proyecto',
      detail: '/proyectos/detalle',
    },
    projects: {
      list: '/cpanel/proyectos',
      detail: '/cpanel/proyectos/detalle',
      simulator: '/cpanel/proyectos/simulador-proyecto',
    },
    board: '/cpanel/board',
  },
  uikit: '/uikit',
  page_not_fount: '*',
}

export default routes
