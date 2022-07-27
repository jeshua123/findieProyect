export interface IPlan {
  _id: string
  createdAt: number
  name: string
  entity: 'client' | 'freelancer'
  price: number
  price_type: 'percent' | 'uf' | 'cash'
  fee: number
  comment: string
  is_monthly_pay_out: boolean
  is_price_affect_project: boolean
  is_available: boolean
  is_secret: boolean
}
