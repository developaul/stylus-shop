import { UserCartProduct } from "."
import { AuthProvider } from "@/constants"

export interface User {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password?: string
  provider: AuthProvider,
  cartProducts: UserCartProduct[]
  favoriteProducts: string[]
}

export interface ShortUser extends Pick<User, '_id' | 'firstName' | 'lastName' | 'email' | 'cartProducts' | 'favoriteProducts'> {

}

export interface TokenUser extends Pick<User, '_id' | 'email'> { }