import axios from "axios"

import { ShortUser } from "@/interfaces"

const userApi = axios.create({
  baseURL: '/api/user'
})

export const getUserById = async (userId: string): Promise<ShortUser> => {
  const { data } = await userApi.get<ShortUser>(`/${userId}`)

  return data
}

export const addFavoriteProduct = async (userId: string, favoriteProductId: string): Promise<void> => {
  await userApi.post('/addFavoriteProduct', { userId, favoriteProductId })
}

export const removeFavoriteProduct = async (userId: string, favoriteProductId: string): Promise<void> => {
  await userApi.post('/removeFavoriteProduct', { userId, favoriteProductId })
}