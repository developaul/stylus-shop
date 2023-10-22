import mongoose, { Schema, model, Model } from 'mongoose'

import { Order } from '@/interfaces'
import { OrderStatus, OrderStatusEnum, SizeEnum } from '@/constants'

const { ObjectId } = Schema

const OrderProduct = new Schema({
  productId: { type: ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  size: {
    type: String,
    enum: { values: SizeEnum, message: '{VALUE} no es un size valido' },
    required: true
  },
  quantity: { type: Number, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false })

const OrderSummary = new Schema({
  orderValue: { type: Number, required: true },
  delivery: { type: Number, required: true },
  total: { type: Number, required: true }
}, { _id: false })

const ShippingAddress = new Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true }
}, { _id: false })

const orderSchema = new Schema({
  status: {
    type: String,
    required: true,
    default: OrderStatus.Pending,
    enum: { values: OrderStatusEnum, message: '{VALUE} no es un status valido' }
  },
  orderProducts: { type: [OrderProduct], required: true },
  orderSummary: { type: OrderSummary, required: true },
  shippingAddress: { type: ShippingAddress, required: true },
  paidAt: { type: Date },
  cancelledAt: { type: Date },
  createdById: { type: ObjectId, ref: 'User' }
}, { timestamps: true })

type OrderMongo = Order

export const OrderModel: Model<OrderMongo> = mongoose.models.Order ?? model('Order', orderSchema)