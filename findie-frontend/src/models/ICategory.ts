export interface ICategory {
  _id: string
  name: string
  createdAt: number
  categoryType?: string
  portfolio: {
    isRequired: boolean
    should_render: boolean
  }
  is_available: boolean
  is_link_required: boolean
  is_other_category: boolean
}
