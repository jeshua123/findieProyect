import { UseQueryResult } from 'react-query'
import { ICategory } from './ICategory'

interface IStorage {
  item: any
  setItem: (value: any) => void
  removeItem: () => void
}

export interface IOptions {
  value: string
  label: string
  comment?: string
}

interface IExamples {
  title: string
  options: string[]
}

export interface IFormStep {
  isButtonDisabled: boolean
  storage: IStorage
  theme?: 'blue' | 'light-orange'
  route?: string
  border?: any
  currentStep?: string
  setFreelancerName?: (name: string) => void
  handleStep: (step: string) => void
  setTheme: (selectedTheme?: string) => Record<string, any>
  setIsButtonDisabled: (val: boolean) => void
  categoriesQuery?: UseQueryResult<ICategory[], unknown>
}

export interface IUseFormSteps extends IFormStep {
  title: string
  name: string
  placeholder?: string
  options?: IOptions[]
  examples?: IExamples
  withComments?: boolean
  asCategories?: boolean
}
