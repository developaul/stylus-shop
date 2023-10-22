import { createContext } from 'react';

import { RegisterUserArgs, ShortUser, UpdateUserArgs } from '@/interfaces';

interface ContextProps {
  user: ShortUser | null
  isLoggedIn: boolean

  // methods
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  register: (args: RegisterUserArgs) => Promise<void>
  updateUser: (args: Omit<UpdateUserArgs, '_id'>) => Promise<void>
}

export const UserContext = createContext({} as ContextProps)