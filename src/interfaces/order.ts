import { OrderStatus, Size } from "@/constants"
import { CreatedByUser } from "./user"

export interface Order {
  _id: string
  orderProducts: OrderProduct[]
  orderSummary: OrderSummary
  shippingAddress: ShippingAddress
  cancelledAt?: string
  paidAt?: string
  status: OrderStatus
  createdById: string
  createdAt: Date
  updatedAt: Date
  transactionId?: string
  cancelledById?: string
  createdBy?: CreatedByUser
}

export interface ShortOrder extends Pick<Order, '_id' | 'status' | 'orderProducts' | 'orderSummary' | 'shippingAddress' | 'createdById' | 'createdAt' | 'createdBy'> {
}

export interface OrderInput extends Pick<Order, 'createdById' | 'orderProducts' | 'orderSummary' | 'shippingAddress'> {

}

export interface OrderProduct {
  productId: string
  title: string
  size: Size
  quantity: number
  slug: string
  image: string
  price: number
}

export interface ShippingAddress {
  phone: string
  email: string
  address: string
  zipCode: string
  country: string
  city: string
}

export interface OrderSummary {
  orderValue: number
  delivery: number
  total: number
}

export interface PayOrderInput {
  orderId: string,
  transactionId: string
}