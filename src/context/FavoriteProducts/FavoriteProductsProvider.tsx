import { FC, ReactElement, useEffect, useReducer } from 'react'
import { FavoriteProductsContext, favoriteProductsReducer } from './'

import { userDataSource } from '@/datasources'
import { FavoriteProduct } from '@/interfaces'
import { useSession } from 'next-auth/react'

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
  const { data: session, status } = useSession()

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
    if (['unauthenticated', 'loading'].includes(status) || !session?.user) return

    loadFavoriteProductsFromDb(session.user._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user, status])

  const loadFavoriteProductsFromDb = async (userId: string) => {
    try {
      const favoriteProducts = await userDataSource.getFavoriteProducts(userId)
      loadFavoriteProducts(favoriteProducts)
    } catch (error) {
      console.error(error)
    }
  }

  const loadFavoriteProducts = (favoriteProducts: FavoriteProduct[]) => {
    localStorage.setItem('favorites', JSON.stringify(favoriteProducts))
    dispatch({ type: '[FavoriteProducts] - Load favorite products', payload: favoriteProducts })
  }

  const addFavoriteProduct = (favoriteProduct: FavoriteProduct) => {
    const newFavoriteProducts = state.favoriteProducts.concat(favoriteProduct)
    if (session?.user) userDataSource.addFavoriteProduct(session.user._id, favoriteProduct._id).catch(console.error)
    localStorage.setItem('favorites', JSON.stringify(newFavoriteProducts))
    dispatch({ type: '[FavoriteProducts] - Add favorite product', payload: newFavoriteProducts })
  }

  const removeFavoriteProduct = (productId: string) => {
    const newFavoriteProducts = state.favoriteProducts.filter(favoriteProduct => favoriteProduct._id !== productId)
    if (session?.user) userDataSource.removeFavoriteProduct(session.user._id, productId).catch(console.error)
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