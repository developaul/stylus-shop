import { createContext } from 'react';

import { ShortUser } from '@/interfaces';

interface ContextProps {
  user: ShortUser | null

  // methods
  logout: () => void
  login: (email: string, password: string) => Promise<void>
}

export const UserContext = createContext({} as ContextProps)