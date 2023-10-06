import { createContext } from 'react';

import { FavoriteProduct } from '@/interfaces';

interface ContextProps {
  favoriteProducts: FavoriteProduct[]

  // methods
  addFavoriteProduct: (favoriteProduct: FavoriteProduct) => void
  removeFavoriteProduct: (productId: string) => void
}

export const FavoriteProductsContext = createContext({} as ContextProps)