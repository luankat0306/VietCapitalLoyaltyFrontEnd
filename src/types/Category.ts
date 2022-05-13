import { Product } from './Product'

export interface Category {
  id: number
  title: string
  product: Product[]
}
