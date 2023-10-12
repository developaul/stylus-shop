import { createContext } from 'react';

import { ShortUser } from '@/interfaces';

interface ContextProps {
  user: ShortUser | null
}

export const UserContext = createContext({} as ContextProps)