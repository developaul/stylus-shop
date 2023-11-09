import { FC, ReactElement, useEffect, useReducer } from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'

import { UserContext, userReducer } from './'

import { adminDataSource, userDataSource } from '@/datasources'
import { CartProduct, FavoriteProduct, RegisterUserArgs, ShortUser } from '@/interfaces'
import { UserRole } from '@/constants'
import { Product } from '@/utils'

export interface UserState {
  user: ShortUser | null
  isLoggedIn: boolean
}

const User_INITIAL_STATE: UserState = {
  user: null,
  isLoggedIn: false
}

interface Props {
  children: ReactElement | ReactElement[]
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, User_INITIAL_STATE)

  const { data: session, status } = useSession()

  useEffect(() => {
    if (['unauthenticated', 'loading'].includes(status) || !session?.user) return

    loadUser(session.user._id)
  }, [session?.user, status])

  const loadUser = async (userId: string) => {
    try {
      const user = await userDataSource.getUserById(userId)
      dispatch({ type: '[User] - Load user', payload: user })
    } catch (error) {
      console.error(error)
    }
  }

  const register = async (args: RegisterUserArgs) => {
    try {
      const { email, password } = args

      await userDataSource.registerUser(args)

      await login(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (email: string, password: string) => {
    const cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') ?? '') ?? []
    const cartProducts = JSON.stringify(Product.transformToUserCartProduct(cart))
    const favoriteProducts: FavoriteProduct[] = JSON.parse(localStorage.getItem('favorites') ?? '') ?? []
    const favoriteProductIds = JSON.stringify(favoriteProducts.map(({ _id }) => _id))

    await signIn('credentials', { email, password, cartProducts, favoriteProductIds }).catch(console.error)
  }

  const logout = () => {
    localStorage.removeItem('cart')
    localStorage.removeItem('favorites')
    signOut()
  }

  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      await adminDataSource.updateUserRole(userId, role)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        updateUserRole
      }}>
      {children}
    </UserContext.Provider>
  )
}