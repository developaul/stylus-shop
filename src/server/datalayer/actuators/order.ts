import { isValidObjectId } from "mongoose";

import { OrderModel, ProductModel, UserModel, mongoConnection } from "..";

import { OrderInput, ShortOrder } from "@/interfaces";
import { keyBy } from "@/utils";
import { OrderStatus } from "@/constants";


export const getOrderById = async (id: string): Promise<ShortOrder | null> => {
  if (!isValidObjectId(id)) return null

  await mongoConnection.connect()
  const order = await OrderModel
    .findById(id)
    .select({
      _id: 1,
      status: 1,
      orderProducts: 1,
      orderSummary: 1,
      shippingAddress: 1,
      createdById: 1
    })
    .lean()
  await mongoConnection.disconnect()

  if (!order) return null

  return JSON.parse(JSON.stringify(order))
}

export const getOrdersByUserId = async (userId: string): Promise<ShortOrder[]> => {
  if (!isValidObjectId(userId)) return []

  await mongoConnection.connect()
  const orders = await OrderModel
    .find({ createdById: userId })
    .select({
      _id: 1,
      status: 1,
      orderProducts: 1,
      orderSummary: 1,
      shippingAddress: 1,
      createdById: 1
    })
    .lean()
  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(orders))
}

interface GetOrderInputResponse extends OrderInput {
  status: OrderStatus
}

const getOrderInput = async ({ createdById, orderProducts, orderSummary, shippingAddress }: OrderInput): Promise<GetOrderInputResponse> => {

  const productIds = orderProducts.map(({ productId }) => productId)

  await mongoConnection.connect()
  const products = await ProductModel
    .find({ _id: { $in: productIds } })
    .select({
      _id: 1,
      price: 1
    })
    .lean()
  await mongoConnection.disconnect()

  const productBy = keyBy(products, '_id')

  const orderValue = orderProducts.reduce((prev, current) => {
    const product = productBy[current.productId]
    return prev + (product.price * current.quantity)
  }, 0)
  const delivery = 10

  const total = orderValue + delivery

  if (orderSummary.total !== total) throw new Error('El total no cuadra con el monto')

  return {
    createdById,
    orderProducts,
    orderSummary,
    shippingAddress,
    status: OrderStatus.Pending
  }
}

export const createOrder = async (args: OrderInput): Promise<ShortOrder> => {
  const orderToCreate = await getOrderInput(args)
  await mongoConnection.connect()

  await UserModel.findByIdAndUpdate(args.createdById, {
    $set: {
      ...args.shippingAddress,
      cartProducts: []
    }
  })

  const newOrder = await OrderModel.create(orderToCreate)
  await mongoConnection.disconnect()

  const { _id, status, orderProducts, orderSummary, shippingAddress, createdById, createdAt } = newOrder

  return { _id, status, orderProducts, orderSummary, shippingAddress, createdById, createdAt }
}