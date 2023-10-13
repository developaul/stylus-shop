import axios from "axios"

import { ShortUser } from "@/interfaces"

const userApi = axios.create({
  baseURL: '/api/user'
})

export const getUserById = async (userId: string): Promise<ShortUser> => {
  const { data } = await userApi.get<ShortUser>('/:userId', { params: userId })

  return data
}