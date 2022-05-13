import { Product } from '_types/Product'
export interface Bill {
  transactionId: string
  fromDay: string
  toDay: string
  status: string
  price: string
  quantity: string
  product: Product
}
