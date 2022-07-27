import { IBank } from './IBank'
import { IFreelancer } from './IFreelancer'

export interface IClient {
  _id: string
  companyName: string
  job_title: string
  createdAt: number
  name: string
  lastName: string
  invitation_ticket: string
  email: string
  phone: string
  webSite: string
  industry: string
  bank_detail: IBank
  favorite_freelancer: IFreelancer | undefined
  client_status: 'not_available' | 'available' | 'suspended'
}
