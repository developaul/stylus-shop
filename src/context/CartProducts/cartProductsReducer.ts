import { CartProductsState } from '.';

type CartProductsActionType =
  | { type: '[CartProducts] - Add product to cart' }

export const cartProductsReducer = (state: CartProductsState, action: CartProductsActionType): CartProductsState => {
  switch (action.type) {
    case '[CartProducts] - Add product to cart':
      return { ...state, }

    default:
      return state
  }
}