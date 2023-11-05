import axios from "axios"

import { OrderInput, PayOrderInput, ShortOrder } from "@/interfaces"

const orderApi = axios.create({
  baseURL: '/api/order'
})


export const createOrder = async (args: Omit<OrderInput, 'createdById'>): Promise<ShortOrder> => {
  const { data: order } = await orderApi.post<ShortOrder>('/create', args)

  return order
}

export const payOrder = async (args: PayOrderInput) => {
  await orderApi.post('/pay', args)
}