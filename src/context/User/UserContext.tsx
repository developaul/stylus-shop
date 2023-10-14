import { createContext } from 'react';

import { ShortUser } from '@/interfaces';
import { RegisterArgs } from '.';

interface ContextProps {
  user: ShortUser | null
  isLoggedIn: boolean

  // methods
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  register: (args: RegisterArgs) => Promise<void>
}

export const UserContext = createContext({} as ContextProps)