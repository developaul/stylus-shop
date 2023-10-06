import { FC, ReactElement, useReducer } from 'react'
import { CartProductsContext, cartProductsReducer } from './'
import { CartProduct } from '@/interfaces'

export interface CartProductsState {
  cartProducts: CartProduct[]
}

const CartProducts_INITIAL_STATE: CartProductsState = {
  cartProducts: []
}

interface Props {
  children: ReactElement | ReactElement[]
}

export const CartProductsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartProductsReducer, CartProducts_INITIAL_STATE)

  return (
    <CartProductsContext.Provider
      value={{ ...state }}>
      {children}
    </CartProductsContext.Provider>
  )
}