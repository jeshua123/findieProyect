import { IPlan } from './IPlan'
import { IFreelancer } from './IFreelancer'
import { ICategory } from './ICategory'
import { IClient } from './IClient'
import { ISkill } from './ISkill'
import { IPayment } from './IPayment'

export interface IProject {
  _id: string
  createdAt: number
  title: string
  brief: string
  budget: string
  client: IClient
  category: ICategory
  skills: ISkill[]
  plan: IPlan
  uf: number
  evaluation_status: TProjectEvaluationStatus
  project_status: TProjectStatus
  stack_list: IStack[]
  price: IProjectPrice
  profits: {
    freelancers: number
    client: number
    total: number
  }
  proposed_options: {
    category: string
    skills: string[]
  }
}

export type TProjectEvaluationStatus = 'step_one' | 'step_two' | 'step_three' | 'step_four' | 'step_five'
export type TProjectStatus = 'not_approved' | 'in_progress' | 'finished' | 'cancelled'

export interface IProjectPrice {
  available_budget: number
  subtotal: number
  iva: number
  external_payment: number
  plan_fee_amount: number
  plan_price_amount: number
  total: number
  sii_tax: {
    type: string
    tax: number
  }
  payment_method: {
    _id: string
    method: string
    fee: number
  }
  total_freelancers_payment: number

  has_no_tax: boolean
  is_bill: boolean
  is_ticket: boolean
  is_freelancer_member: boolean
  has_promo_ticket: boolean
  is_lite_commission: boolean
}

export interface IStack {
  stack_id: string
  category: ICategory
  skills: ISkill[]
  freelancer: IFreelancer
  hour_price: number
  billing_plan: string
  meeting_days: string[]
  payments: IPayment[]
  has_leave_project: boolean
  is_promo_ticket_already_removed: boolean
  meetings_hours: {
    from: string
    to: string
  }
  payment: {
    has_promo_ticket: boolean
    tax_type: 'ticket' | 'bill'
    price: number
    sii_tax: number
    total_price: number
    price_after_fee: number
  }
}
