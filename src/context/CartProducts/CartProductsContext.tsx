import { createContext } from 'react';

import { CartProduct } from '@/interfaces';

interface ContextProps {
  cartProducts: CartProduct[]
}

export const CartProductsContext = createContext({} as ContextProps)