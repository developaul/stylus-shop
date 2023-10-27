import { createContext } from 'react';

import { CartProduct, OrderSummary, ShippingAddress, ShortOrder } from '@/interfaces';

interface ContextProps {
  cartProducts: CartProduct[]
  orderSummary: OrderSummary

  // Methods
  addProductToCart: (newCartProduct: CartProduct) => void
  removeProductFromCart: (newCartProduct: CartProduct) => void
  updateCartProduct: (newCartProduct: CartProduct) => void
  createOrder: (shippingAddress: ShippingAddress) => Promise<ShortOrder>
}

export const CartProductsContext = createContext({} as ContextProps)