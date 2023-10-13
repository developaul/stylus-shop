import { FC, ReactElement, useEffect, useReducer } from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'

import { UserContext, userReducer } from './'

import { ShortUser } from '@/interfaces'
import { getUserById } from '@/datasources'

export interface UserState {
  user: ShortUser | null
}

const User_INITIAL_STATE: UserState = {
  user: null
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
      const user = await getUserById(userId)
      dispatch({ type: '[User] - Load user', payload: user })
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (email: string, password: string) => {
    await signIn('credentials', { email, password }).catch(console.error)
  }

  const logout = () => {
    localStorage.removeItem('cart')
    localStorage.removeItem('favorites')
    signOut()
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout
      }}>
      {children}
    </UserContext.Provider>
  )
}