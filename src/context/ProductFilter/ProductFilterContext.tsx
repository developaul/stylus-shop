import { createContext } from 'react';

import { Order, Size } from '@/constants';

interface ContextProps {
  sizeFilter: Size[]
  order: Order
  updateSizeFilter: (size: Size[]) => void
  updateOrder: (order: Order) => void
}

export const ProductFilterContext = createContext({} as ContextProps)