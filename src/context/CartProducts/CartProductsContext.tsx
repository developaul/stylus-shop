import { createContext } from 'react';

import { CartProduct, OrderSummary } from '@/interfaces';

interface ContextProps {
  cartProducts: CartProduct[]
  orderSummary: OrderSummary

  // Methods
  addProductToCart: (newCartProduct: CartProduct) => void
  removeProductFromCart: (newCartProduct: CartProduct) => void
  updateCartProduct: (newCartProduct: CartProduct) => void
}

export const CartProductsContext = createContext({} as ContextProps)