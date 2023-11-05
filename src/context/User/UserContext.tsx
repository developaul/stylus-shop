import { createContext } from 'react';

import { RegisterUserArgs, ShortUser } from '@/interfaces';
import { UserRole } from '@/constants';

interface ContextProps {
  user: ShortUser | null
  isLoggedIn: boolean

  // methods
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  register: (args: RegisterUserArgs) => Promise<void>
  updateUserRole: (userId: string, role: UserRole) => Promise<void>
}

export const UserContext = createContext({} as ContextProps)