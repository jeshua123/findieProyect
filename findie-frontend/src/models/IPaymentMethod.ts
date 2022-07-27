export interface IPaymentMethod {
  _id: string
  createdAt: number
  name: string
  fee: number
  is_available: boolean
}
