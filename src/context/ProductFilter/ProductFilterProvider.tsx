import { FC, ReactElement, useReducer } from 'react'
import { ProductFilterContext, ProductFilterReducer } from './'

import { Order, Size } from '@/constants'

export interface ProductFilterState {
  sizeFilter: Size[]
  order: Order
}

const ProductFilter_INITIAL_STATE: ProductFilterState = {
  sizeFilter: [Size.All],
  order: Order.Desc
}

interface Props {
  children: ReactElement | ReactElement[]
}

export const ProductFilterProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(ProductFilterReducer, ProductFilter_INITIAL_STATE)

  const updateSizeFilter = (size: Size[]) => {
    dispatch({ type: '[ProductFilter] - Update size filter', payload: size })
  }

  const updateOrder = (order: Order) => {
    dispatch({ type: '[ProductFilter] - Update order', payload: order })
  }

  return (
    <ProductFilterContext.Provider
      value={{
        ...state,
        updateSizeFilter,
        updateOrder
      }}>
      {children}
    </ProductFilterContext.Provider>
  )
}