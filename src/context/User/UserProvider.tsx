import { FC, ReactElement, useReducer } from 'react'

import { UserContext, userReducer } from './'

import { ShortUser } from '@/interfaces'

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

  return (
    <UserContext.Provider
      value={{ ...state }}>
      {children}
    </UserContext.Provider>
  )
}