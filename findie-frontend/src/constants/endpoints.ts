const endpoints = {
  //Categories
  categories: 'api/v1/categories/',
  category: (id: string) => `api/v1/categories/${id}/`,

  //Skills
  skills: `api/v1/skills/`,
  skillsByCategory: (filters: string) => `api/v1/skills?filters=${filters}`,
  skill: (id: string) => `api/v1/skills/${id}/`,

  //Freelancers
  freelancers: `api/v1/freelancers/`,
  freelancersFiltered: (filters: string) => `api/v1/freelancers?filters=${filters}`,
  publicFreelancers: (filters: string) => `api/v1/freelancers/publicFreelancers?filters=${filters}`,
  freelancer: (id: string) => `api/v1/freelancers/${id}/`,
  profile: (id: string) => `api/v1/freelancers/profile/${id}/`,
  portfolioFiles: (id: string) => `api/v1/freelancers/portfolio_files/${id}/`,
  portfolioDragAndDrop: (id: string) => `api/v1/freelancers/handle_portfolio_dragAndDrop/${id}/`,
  removePortfolioFiles: (id: string) => `api/v1/freelancers/remove_portfolio_file/${id}/`,
  removePortfolioPdf: (id: string) => `api/v1/freelancers/remove_portfolio_pdf/${id}/`,
  handleFeatureFreelancer: (id: string, category: string) => `api/v1/freelancers/handle_feature_freelancer/${id}/${category}`,
  dragAndDropFreelancer: `api/v1/freelancers/drag_and_drop_freelancer/`,

  //Clients
  clients: `api/v1/clients/`,
  clientsProject: `api/v1/clients/projectclient/`,
  clientsFiltered: (filters: string) => `api/v1/clients?filters=${filters}`,
  client: (id: string) => `api/v1/clients/${id}/`,

  //Admins
  admins: `api/v1/admins/`,
  admin: (id: string) => `api/v1/admins/${id}/`,

  //Plans
  plans: `api/v1/plans/`,
  plansFiltered: (filters: string) => `api/v1/plans?filters=${filters}`,
  plan: (id: string) => `api/v1/plans/${id}/`,

  //Project
  projects: `api/v1/projects/`,
  projectsFiltered: (filters: string) => `api/v1/projects?filters=${filters}`,
  project: (id: string) => `api/v1/projects/${id}/`,
  updateProjectPrice: (id: string) => `api/v1/projects/updateProjectPrice/${id}/`,
  finishCancellProject: (id: string) => `api/v1/projects/finish_cancel_project/${id}/`,
  updateWithCalculator: (id: string) => `api/v1/projects/updateWithCalculator/${id}/`,
  updateFreelancerStack: (id: string) => `api/v1/projects/updateFreelancerStack/${id}`,
  suspendStack: (id: string) => `api/v1/projects/suspendStack/${id}`,

  //Payments
  payments: `api/v1/payments/`,
  paymentsFiltered: (filters: string) => `api/v1/payments?filters=${filters}`,
  payment: (id: string) => `api/v1/payments/${id}/`,

  //PaymentMethods
  paymentMethods: `api/v1/paymentMethods/`,
  paymentMethod: (id: string) => `api/v1/paymentMethods/${id}/`,

  //Blog
  blogs: `api/v1/blogs/emails`,
  blog: (email: string) => `api/v1/blogs/email/${email}/`,

  //Authentication
  login: `api/v1/auth/`,
}
export default endpoints
