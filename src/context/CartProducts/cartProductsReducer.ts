import { CartProductsState } from '.';

import { CartProduct } from '@/interfaces';

type CartProductsActionType =
  | { type: '[CartProducts] - Load cart products', payload: CartProduct[] }
  | { type: '[CartProducts] - Add product to cart', payload: CartProduct[] }
  | { type: '[CartProducts] - Remove product from cart', payload: CartProduct[] }
  | { type: '[CartProducts] - Update product from cart', payload: CartProduct[] }
  | { type: '[CartProducts] - Clean cart products' }

export const cartProductsReducer = (state: CartProductsState, action: CartProductsActionType): CartProductsState => {
  switch (action.type) {
    case '[CartProducts] - Load cart products':
    case '[CartProducts] - Add product to cart':
    case '[CartProducts] - Remove product from cart':
    case '[CartProducts] - Update product from cart':
      return { ...state, cartProducts: action.payload }

    case '[CartProducts] - Clean cart products':
      return { ...state, cartProducts: [] }

    default:
      return state
  }
}