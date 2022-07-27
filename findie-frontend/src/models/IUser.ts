export type TAvatarStyle = 'yellow' | 'strong_rose' | 'red' | 'sea_blue' | 'soft_blue' | 'light_black' | 'white'

export interface IUser {
  _id: string
  created_at: number
  name: string
  last_name: string
  email: string
  phone: string
  user_type: 'super_admin' | 'admin' | 'freelancer' | 'client'
  avatar_style: TAvatarStyle
}
