import { FC, ReactElement, useReducer } from 'react'
import { FavoriteProductsContext, favoriteProductsReducer } from './'

import { FavoriteProduct } from '@/interfaces'

export interface FavoriteProductsState {
  favoriteProducts: FavoriteProduct[]
}

const FavoriteProducts_INITIAL_STATE: FavoriteProductsState = {
  favoriteProducts: []
}

interface Props {
  children: ReactElement | ReactElement[]
}

export const FavoriteProductsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteProductsReducer, FavoriteProducts_INITIAL_STATE)

  const addFavoriteProduct = (favoriteProduct: FavoriteProduct) => {
    dispatch({ type: '[FavoriteProducts] - Add favorite product', payload: favoriteProduct })
  }

  const removeFavoriteProduct = (productId: string) => {
    dispatch({ type: '[FavoriteProducts] - Remove favorite product', payload: productId })
  }

  return (
    <FavoriteProductsContext.Provider
      value={{
        ...state,

        // methods
        addFavoriteProduct,
        removeFavoriteProduct
      }}>
      {children}
    </FavoriteProductsContext.Provider>
  )
}