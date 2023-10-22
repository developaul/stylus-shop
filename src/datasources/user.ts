import axios from "axios"

import { CartProduct, FavoriteProduct, RegisterUserArgs, ShortUser, UpdateUserArgs, UserCartProduct } from "@/interfaces"

const userApi = axios.create({
  baseURL: '/api/user'
})

export const getUserById = async (userId: string): Promise<ShortUser> => {
  const { data } = await userApi.get<ShortUser>(`/${userId}`)

  return data
}

export const registerUser = async (args: RegisterUserArgs): Promise<void> => {
  await userApi.post('/create', args)
}

export const addFavoriteProduct = async (userId: string, favoriteProductId: string): Promise<void> => {
  await userApi.post('/favorites/add', { userId, favoriteProductId })
}

export const removeFavoriteProduct = async (userId: string, favoriteProductId: string): Promise<void> => {
  await userApi.post('/favorites/remove', { userId, favoriteProductId })
}

export const getFavoriteProducts = async (userId: string): Promise<FavoriteProduct[]> => {
  const { data } = await userApi.get<FavoriteProduct[]>(`/favorites/${userId}`)

  return data
}

export const updateCartProducts = async (userId: string, cartProducts: UserCartProduct[]) => {
  await userApi.post('/cart/update', { userId, cartProducts })
}

export const getCartProducts = async (userId: string): Promise<CartProduct[]> => {
  const { data } = await userApi.get<CartProduct[]>(`/cart/${userId}`)

  return data
}

export const updateUser = async (args: UpdateUserArgs) => {
  await userApi.post('/update', args)
}