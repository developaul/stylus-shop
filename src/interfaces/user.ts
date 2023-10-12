import { UserCartProduct } from "."
import { AuthProvider } from "@/constants"

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password?: string
  provider: AuthProvider,
  cartProducts: UserCartProduct[]
  favoriteProducts: string[]
}