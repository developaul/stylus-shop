import { FavoriteProductsState } from '.';

import { FavoriteProduct } from '@/interfaces';

type FavoriteProductsActionType =
  | { type: '[FavoriteProducts] - Add favorite product', payload: FavoriteProduct }
  | { type: '[FavoriteProducts] - Remove favorite product', payload: string }


export const favoriteProductsReducer = (state: FavoriteProductsState, action: FavoriteProductsActionType): FavoriteProductsState => {
  switch (action.type) {
    case '[FavoriteProducts] - Add favorite product':
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, action.payload]
      }

    case '[FavoriteProducts] - Remove favorite product':
      return {
        ...state,
        favoriteProducts: state.favoriteProducts
          .filter(favoriteProduct => favoriteProduct._id !== action.payload)
      }


    default:
      return state
  }
}