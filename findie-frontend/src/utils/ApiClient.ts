import autoBind from 'auto-bind'
import endpoints from '../constants/endpoints'
import { ICategory } from '../models/ICategory'
import { IClient } from '../models/IClient'
import {
  IFreelancer,
  IPortfolioFile,
  IPortfolioFileBody,
  IPortfolioLinkBody,
  IPortfolioRemoveFileBody,
} from '../models/IFreelancer'
import { IMetadata } from '../models/IMetadata'
import { IPayment } from '../models/IPayment'
import { IPlan } from '../models/IPlan'
import { IProject } from '../models/IProject'
import { ISkill } from '../models/ISkill'
import { IClientProject } from '../models/IClientProject'
import { IUser } from '../models/IUser'
import { IBlog } from '../models/IBlog'
import { IPaymentMethod } from '../models/IPaymentMethod'

class APIClient {
  server: string
  endpoints = endpoints
  mode: any

  constructor(props: { SERVER: 'PROD' | 'DEV' | 'STAGING' }) {
    this.server = getServerUrl(props.SERVER)
    this.mode = props.SERVER
    autoBind(this)
  }

  async fetch<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    data: FormData | any = undefined
  ): Promise<T> {
    const body = JSON.stringify(data)
    const headers = { 'Content-Type': 'application/json' }

    const request = await fetch(`${this.server}${url}`, { method, body, headers })
    if (request.ok) return request.json()
    throw { name: 'Fetch error', response: request, json: await this.tryJson(request) }
  }

  async tryJson(res: Response) {
    try {
      return await res.json()
    } catch (e) {
      return null
    }
  }

  //Categories
  getCategories(): Promise<{ data: ICategory[] }> {
    return this.fetch(this.endpoints.categories, 'GET')
  }
  getCategory(id: string): Promise<{ data: ICategory }> {
    return this.fetch(this.endpoints.category(id), 'GET')
  }
  postCategory(body: ICategory): Promise<{ data: ICategory }> {
    return this.fetch(this.endpoints.categories, 'POST', body)
  }
  putCategory(params: { body: ICategory; _id: string }): Promise<{ data: ICategory }> {
    return this.fetch(this.endpoints.category(params._id), 'PUT', params.body)
  }
  deleteCategory(_id: string): Promise<{ data: ICategory }> {
    return this.fetch(this.endpoints.category(_id), 'DELETE')
  }

  //Skills
  getSkillsByCategory(filters: string): Promise<{ data: ISkill[] }> {
    return this.fetch(this.endpoints.skillsByCategory(filters), 'GET')
  }
  getSkill(id: string): Promise<{ data: ISkill }> {
    return this.fetch(this.endpoints.skill(id), 'GET')
  }
  postSkill(body: ISkill): Promise<{ data: ISkill }> {
    return this.fetch(this.endpoints.skills, 'POST', body)
  }
  putSkill(params: { body: ISkill; _id: string }): Promise<{ data: ISkill }> {
    return this.fetch(this.endpoints.skill(params._id), 'PUT', params.body)
  }
  deleteSkill(_id: string): Promise<{ data: ISkill }> {
    return this.fetch(this.endpoints.skill(_id), 'DELETE')
  }

  //Plans
  getPlans(): Promise<{ data: IPlan[] }> {
    return this.fetch(this.endpoints.plans, 'GET')
  }
  getPlansFiltered(filters: string): Promise<{ data: IPlan[] }> {
    return this.fetch(this.endpoints.plansFiltered(filters), 'GET')
  }
  getPlan(id: string): Promise<{ data: IPlan }> {
    return this.fetch(this.endpoints.plan(id), 'GET')
  }
  postPlan(body: IPlan): Promise<{ data: IPlan }> {
    return this.fetch(this.endpoints.plans, 'POST', body)
  }
  putPlan(params: { body: IPlan; _id: string }): Promise<{ data: IPlan }> {
    return this.fetch(this.endpoints.plan(params._id), 'PUT', params.body)
  }
  deletePlan(_id: string): Promise<{ data: IPlan }> {
    return this.fetch(this.endpoints.plan(_id), 'DELETE')
  }

  //Freelancers
  getFreelancersFiltered(filters: string): Promise<{ data: IFreelancer[]; metadata: IMetadata }> {
    return this.fetch(this.endpoints.freelancersFiltered(filters), 'GET')
  }
  getPublicFreelancers(filters: string): Promise<{ data: IFreelancer[]; metadata: IMetadata }> {
    return this.fetch(this.endpoints.publicFreelancers(filters), 'GET')
  }
  getFreelancerProfile(id: string): Promise<IFreelancer> {
    return this.fetch(this.endpoints.profile(id), 'GET')
  }
  getFreelancer(id: string): Promise<IFreelancer> {
    return this.fetch(this.endpoints.freelancer(id), 'GET')
  }
  postFreelancer(body: IFreelancer): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.freelancers, 'POST', body)
  }
  putFreelancer(params: { body: Partial<IFreelancer>; _id: string }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.freelancer(params._id), 'PUT', params.body)
  }
  handleFeatureFreelancer(params: { body: Partial<IFreelancer>; _id: string; category: string }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.handleFeatureFreelancer(params._id, params.category), 'PUT', params.body)
  }
  dragAndDropFreelancer(params: { body: IFreelancer[] }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.dragAndDropFreelancer, 'POST', params.body)
  }
  putPortfolioFiles(params: { body: IPortfolioFileBody | IPortfolioLinkBody; _id: string }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.portfolioFiles(params._id), 'PUT', params.body)
  }
  putPortfolioGragAndDrop(params: { body: IPortfolioFile[]; _id: string }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.portfolioDragAndDrop(params._id), 'PUT', params.body)
  }
  putRemovePortfolioFiles(params: { body: IPortfolioRemoveFileBody; _id: string }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.removePortfolioFiles(params._id), 'PUT', params.body)
  }
  removePortfolioPdf(params: { _id: string }): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.removePortfolioPdf(params._id), 'PUT')
  }
  deleteFreelancer(_id: string): Promise<{ data: IFreelancer }> {
    return this.fetch(this.endpoints.freelancer(_id), 'DELETE')
  }

  //Clients
  getClientsFiltered(filters: string): Promise<{ data: IClient[]; metadata: IMetadata }> {
    return this.fetch(this.endpoints.clientsFiltered(filters), 'GET')
  }
  getClient(id: string): Promise<IClient> {
    return this.fetch(this.endpoints.client(id), 'GET')
  }
  postClient(body: IClient): Promise<{ data: IClient }> {
    return this.fetch(this.endpoints.clients, 'POST', body)
  }
  postClientProject(body: IClientProject): Promise<{ data: IClientProject }> {
    return this.fetch(this.endpoints.clientsProject, 'POST', body)
  }
  putClient(params: { body: Partial<IClient>; _id: string }): Promise<{ data: IClient }> {
    return this.fetch(this.endpoints.client(params._id), 'PUT', params.body)
  }
  deleteClient(_id: string): Promise<{ data: IClient }> {
    return this.fetch(this.endpoints.client(_id), 'DELETE')
  }

  //Admins
  getAdmins(): Promise<{ data: IUser[] }> {
    return this.fetch(this.endpoints.admins, 'GET')
  }
  getAdmin(id: string): Promise<IUser> {
    return this.fetch(this.endpoints.admin(id), 'GET')
  }
  postAdmin(body: IUser): Promise<any> {
    return this.fetch(this.endpoints.admins, 'POST', body)
  }
  putAdmin(params: { body: Partial<IUser>; _id: string }): Promise<IUser> {
    return this.fetch(this.endpoints.admin(params._id), 'PUT', params.body)
  }
  deleteAdmin(_id: string): Promise<{ data: IUser }> {
    return this.fetch(this.endpoints.admin(_id), 'DELETE')
  }

  //Projects
  getProjectsFiltered(filters: string): Promise<{ data: IProject[]; metadata: IMetadata }> {
    return this.fetch(this.endpoints.projectsFiltered(filters), 'GET')
  }
  getProject(id: string): Promise<IProject> {
    return this.fetch(this.endpoints.project(id), 'GET')
  }
  postProject(body: IProject): Promise<{ data: IProject }> {
    return this.fetch(this.endpoints.projects, 'POST', body)
  }
  putProject(params: { body: Partial<IProject>; _id: string }): Promise<IProject> {
    return this.fetch(this.endpoints.project(params._id), 'PUT', params.body)
  }
  finishCancellProject(params: { body: Partial<IProject>; _id: string }): Promise<IProject> {
    return this.fetch(this.endpoints.finishCancellProject(params._id), 'PUT', params.body)
  }
  putUpdateProjectPrice(params: { body: Partial<IProject>; _id: string }): Promise<IProject> {
    return this.fetch(this.endpoints.updateProjectPrice(params._id), 'PUT', params.body)
  }
  putFreelancerStack(params: { body: Partial<IProject>; _id: string }): Promise<IProject> {
    return this.fetch(this.endpoints.updateFreelancerStack(params._id), 'PUT', params.body)
  }
  updateWithCalculator(params: { body: Partial<IProject>; _id: string }): Promise<IProject> {
    return this.fetch(this.endpoints.updateWithCalculator(params._id), 'PUT', params.body)
  }
  suspendStack(params: { body: Partial<IProject>; _id: string }): Promise<IProject> {
    return this.fetch(this.endpoints.suspendStack(params._id), 'PUT', params.body)
  }
  deleteProject(_id: string): Promise<{ data: IProject }> {
    return this.fetch(this.endpoints.project(_id), 'DELETE')
  }
  async getUF(): Promise<any> {
    const request = await fetch('https://mindicador.cl/api/uf')
    if (request.ok) return request.json()
    throw { name: 'Fetch error', response: request, json: await this.tryJson(request) }
  }

  //Payments
  getPaymentsFiltered(filters: string): Promise<{ data: IPayment[] }> {
    return this.fetch(this.endpoints.paymentsFiltered(filters), 'GET')
  }
  getPayment(id: string): Promise<IPayment> {
    return this.fetch(this.endpoints.payment(id), 'GET')
  }
  postPayment(body: IPayment): Promise<any> {
    return this.fetch(this.endpoints.payments, 'POST', body)
  }
  putPayment(params: { body: Partial<IPayment>; _id: string }): Promise<IPayment> {
    return this.fetch(this.endpoints.payment(params._id), 'PUT', params.body)
  }
  deletePayment(_id: string): Promise<{ data: IPayment }> {
    return this.fetch(this.endpoints.payment(_id), 'DELETE')
  }

  //Blog
  getBlogs(): Promise<{ data: IBlog[] }> {
    return this.fetch(this.endpoints.blogs, 'GET')
  }
  getBlog(id: string): Promise<{ data: IBlog }> {
    return this.fetch(this.endpoints.blog(id), 'GET')
  }
  postBlog(body: Partial<IBlog>): Promise<{ data: IBlog }> {
    return this.fetch(this.endpoints.blogs, 'POST', body)
  }

  //Payment method
  getPaymentMethods(): Promise<{ data: IPaymentMethod[] }> {
    return this.fetch(this.endpoints.paymentMethods, 'GET')
  }
  getPaymentMethod(id: string): Promise<{ data: IPaymentMethod }> {
    return this.fetch(this.endpoints.paymentMethod(id), 'GET')
  }
  postPaymentMethod(body: IPaymentMethod): Promise<{ data: IPaymentMethod }> {
    return this.fetch(this.endpoints.paymentMethods, 'POST', body)
  }
  putPaymentMethod(params: { body: IPaymentMethod; _id: string }): Promise<{ data: IPaymentMethod }> {
    return this.fetch(this.endpoints.paymentMethod(params._id), 'PUT', params.body)
  }
  deletePaymentMethod(_id: string): Promise<{ data: IPaymentMethod }> {
    return this.fetch(this.endpoints.paymentMethod(_id), 'DELETE')
  }

  //Authentication
  login(body: { user: string; password: string }): Promise<IUser> {
    return this.fetch(this.endpoints.login, 'POST', body)
  }
}

function getServerUrl(mode: 'PROD' | 'DEV' | 'STAGING') {
  switch (mode) {
    case 'STAGING':
      return process.env.REACT_APP_BACKEND_SERVER_URL!
    case 'DEV':
      return process.env.REACT_APP_BACKEND_SERVER_URL!
    case 'PROD':
      return process.env.REACT_APP_BACKEND_SERVER_URL!
    default:
      return 'http://localhost:5000/'
  }
}

const prod_or_dev_server = process.env.NODE_ENV === 'production' ? 'PROD' : 'STAGING'
const apiClient = new APIClient({ SERVER: prod_or_dev_server })

export { apiClient }
export default APIClient
