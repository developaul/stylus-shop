import { UserCartProduct } from "."
import { AuthProvider, UserRole } from "@/constants"

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  provider: AuthProvider
  role: UserRole
  cartProducts: UserCartProduct[]
  favoriteProductIds: string[]
  phone?: string
  address?: string
  zipCode?: string
  country?: string
  city?: string
}

export interface ShortUser extends Pick<User, '_id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'zipCode' | 'country' | 'city' | 'role'> {
}

export interface CreatedByUser extends Pick<User, '_id' | 'firstName' | 'lastName'> { }

export interface TokenUser extends Pick<User, '_id' | 'email' | 'role'> { }

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