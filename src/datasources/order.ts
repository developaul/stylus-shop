import axios from "axios"

import { OrderInput, ShortOrder } from "@/interfaces"

const userApi = axios.create({
  baseURL: '/api/order'
})


export const createOrder = async (args: Omit<OrderInput, 'createdById'>): Promise<ShortOrder> => {
  const { data: order } = await userApi.post<ShortOrder>('/create', args)

  return order
}