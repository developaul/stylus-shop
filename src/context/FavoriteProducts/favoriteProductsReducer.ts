import { FavoriteProductsState } from '.';

import { FavoriteProduct } from '@/interfaces';

type FavoriteProductsActionType =
  | { type: '[FavoriteProducts] - Load favorite products', payload: FavoriteProduct[] }
  | { type: '[FavoriteProducts] - Add favorite product', payload: FavoriteProduct[] }
  | { type: '[FavoriteProducts] - Remove favorite product', payload: FavoriteProduct[] }


export const favoriteProductsReducer = (state: FavoriteProductsState, action: FavoriteProductsActionType): FavoriteProductsState => {
  switch (action.type) {
    case '[FavoriteProducts] - Load favorite products':
      return {
        ...state,
        favoriteProducts: action.payload
      }

    case '[FavoriteProducts] - Add favorite product':
      return {
        ...state,
        favoriteProducts: action.payload
      }

    case '[FavoriteProducts] - Remove favorite product':
      return {
        ...state,
        favoriteProducts: action.payload
      }

    default:
      return state
  }
}