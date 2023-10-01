import { ProductFilterState } from '.';
import { Order, Size } from '@/constants';

type ProductFilterActionType =
  | { type: '[ProductFilter] - Update size filter', payload: Size[] }
  | { type: '[ProductFilter] - Update order', payload: Order }


export const ProductFilterReducer = (state: ProductFilterState, action: ProductFilterActionType): ProductFilterState => {
  switch (action.type) {
    case '[ProductFilter] - Update size filter':
      return { ...state, sizeFilter: action.payload }

    case '[ProductFilter] - Update order':
      return { ...state, order: action.payload }

    default:
      return state
  }
}