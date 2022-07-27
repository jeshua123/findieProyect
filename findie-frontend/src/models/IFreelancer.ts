import { IBank } from './IBank'
import { IAddress } from './IAddress'
import { ICategory } from './ICategory'
import { ISkill } from './ISkill'
import { IPlan } from './IPlan'
import { TFile } from '../shared/FileDropZone/FileDropZone'

export interface IFreelancer {
  _id: string
  createdAt: number
  name: string
  age: number
  lastName: string
  nationality: string
  address: IAddress
  birthdate: number
  email: string
  phone: string
  invitation_ticket: string
  plan: IPlan
  category: ICategory
  portfolio_link: string
  skills: ISkill[]
  portfolio_video: string
  dni: string
  current_projects: string[]
  postulation_status: 'step_one' | 'step_two' | 'step_three'
  is_hidden: boolean
  cv: any
  portfolio: any
  avatar: any
  freelancer_status: 'not_available' | 'available' | 'suspended'
  is_available_to_work: boolean
  bank_detail: IBank
  biography: string
  college_degree: string
  experience_level: 'junior' | 'semi_senior' | 'senior' | 'expert'
  featured_status: IFeaturedStatus
  portfolio_images: IPortfolioImage[]
  portfolio_files: IPortfolioFile[]
  studies: IStudy[]
  experiences: IExperience[]
  simple_tickets: number[]
  interview_info: string
  proposed_options: {
    category: string
    skills: string[]
  }
  // links: [{
  //   url: string
  //   alias: string
  // }
  // ]
  // offers: [{ project: { type: ObjectId ref: "Message" } offer: Number }]
}

export interface IFeaturedStatus {
  is_featured: boolean
  has_feartued_icon: boolean
  position: number
  position_date: number
}

export interface IPortfolioImage {
  position: number
  file_name?: string
  url?: any
  link?: string
}

export interface IPortfolioFile {
  column: string
  files: IPorfolioFileDetail[]
}

export interface IPortfolioFileBody {
  column: string
  files: TFile[]
}
export interface IPortfolioRemoveFileBody {
  column: string
  file: IPorfolioFileDetail
}

export interface IPortfolioLinkBody {
  column: string
  files: { name: string; link: string }[]
}

export interface IPorfolioFileDetail {
  position: number
  name: string
  url?: string
  link?: string
}

export interface IStudy {
  position: number
  institution: string
  degree: string
  description: string
}

export interface IExperience {
  position: number
  rol: string
  description: string
  link?: string
}
