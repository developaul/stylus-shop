import { UserCartProduct } from "."
import { AuthProvider } from "@/constants"

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  provider: AuthProvider
  cartProducts: UserCartProduct[]
  favoriteProductIds: string[]
  phone?: string
  address?: string
  zipCode?: string
  country?: string
  city?: string
}

export interface ShortUser extends Pick<User, '_id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'zipCode' | 'country' | 'city'> {
}

export interface TokenUser extends Pick<User, '_id' | 'email'> { }

export interface RegisterUserArgs {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UpdateUserArgs {
  userId: string
  email: string
  country: string
  address: string
  zipCode: string
  phone: string
  city: string
}