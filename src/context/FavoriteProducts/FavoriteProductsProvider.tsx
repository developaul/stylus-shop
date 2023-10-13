import { FC, ReactElement, useContext, useEffect, useReducer } from 'react'
import { FavoriteProductsContext, favoriteProductsReducer } from './'

import { UserContext } from '..'
import { userDataSource } from '@/datasources'
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
  const { user } = useContext(UserContext)

  const [state, dispatch] = useReducer(favoriteProductsReducer, FavoriteProducts_INITIAL_STATE)

  useEffect(() => {
    try {
      const favoriteProducts = JSON.parse(localStorage.getItem('favorites') ?? '') ?? []
      loadFavoriteProducts(favoriteProducts)
    } catch (error) {
      loadFavoriteProducts([])
    }
  }, [])

  useEffect(() => {
    if (!user) return
    loadFavoriteProducts(user.favoriteProducts)
  }, [user])

  const loadFavoriteProducts = (favoriteProducts: FavoriteProduct[]) => {
    localStorage.setItem('favorites', JSON.stringify(favoriteProducts))
    dispatch({ type: '[FavoriteProducts] - Load favorite products', payload: favoriteProducts })
  }

  const addFavoriteProduct = (favoriteProduct: FavoriteProduct) => {
    const newFavoriteProducts = state.favoriteProducts.concat(favoriteProduct)
    if (user) userDataSource.addFavoriteProduct(user._id, favoriteProduct._id).catch(console.error)
    localStorage.setItem('favorites', JSON.stringify(newFavoriteProducts))
    dispatch({ type: '[FavoriteProducts] - Add favorite product', payload: newFavoriteProducts })
  }

  const removeFavoriteProduct = (productId: string) => {
    const newFavoriteProducts = state.favoriteProducts.filter(favoriteProduct => favoriteProduct._id !== productId)
    if (user) userDataSource.removeFavoriteProduct(user._id, productId).catch(console.error)
    localStorage.setItem('favorites', JSON.stringify(newFavoriteProducts))
    dispatch({ type: '[FavoriteProducts] - Remove favorite product', payload: newFavoriteProducts })
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