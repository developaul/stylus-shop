import { FC, ReactElement, useEffect, useMemo, useReducer } from 'react'
import { CartProductsContext, cartProductsReducer } from './'

import { CartProduct } from '@/interfaces'
import { Product } from '@/utils'

export interface CartProductsState {
  cartProducts: CartProduct[]
}

const CartProducts_INITIAL_STATE: CartProductsState = {
  cartProducts: []
}

interface Props {
  children: ReactElement | ReactElement[]
}

export const CartProductsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartProductsReducer, CartProducts_INITIAL_STATE)

  useEffect(() => {
    try {
      const cartProducts = JSON.parse(localStorage.getItem('cart') ?? '') ?? []
      loadCartProducts(cartProducts)
    } catch (error) {
      loadCartProducts([])
    }
  }, [])

  const orderSummary = useMemo(() => {
    const orderValue = state.cartProducts.reduce((prev, current) => prev + (current.price * current.quantity), 0)
    const delivery = 10
    const total = orderValue + delivery

    return {
      orderValue,
      delivery,
      total
    }
  }, [state.cartProducts])

  const loadCartProducts = (cartProducts: CartProduct[]) => {
    dispatch({ type: '[CartProducts] - Load products from storage', payload: cartProducts })
  }

  const getNewCartProducts = (newCartProduct: CartProduct) => {
    const productFound = state.cartProducts.some(cartProduct => Product.productsAreEqual(cartProduct, newCartProduct))

    if (!productFound) {
      return state.cartProducts.concat(newCartProduct)
    }

    return state.cartProducts.map(cartProduct => {
      if (!Product.productsAreEqual(cartProduct, newCartProduct)) return cartProduct

      return {
        ...cartProduct,
        quantity: cartProduct.quantity + newCartProduct.quantity
      }
    })
  }

  const addProductToCart = (newCartProduct: CartProduct) => {
    const newCartProducts = getNewCartProducts(newCartProduct)
    localStorage.setItem('cart', JSON.stringify(newCartProducts))
    dispatch({ type: '[CartProducts] - Add product to cart', payload: newCartProducts })
  }

  const removeProductFromCart = (newCartProduct: CartProduct) => {
    const newCartProducts = state.cartProducts
      .filter(cartProduct => !Product.productsAreEqual(cartProduct, newCartProduct))

    localStorage.setItem('cart', JSON.stringify(newCartProducts))
    dispatch({ type: '[CartProducts] - Remove product from cart', payload: newCartProducts })
  }

  const updateCartProduct = (newCartProduct: CartProduct) => {
    const newCartProducts = state.cartProducts.map(cartProduct => {
      if (!Product.productsAreEqual(cartProduct, newCartProduct)) return cartProduct

      return {
        ...cartProduct,
        quantity: newCartProduct.quantity
      }
    })

    localStorage.setItem('cart', JSON.stringify(newCartProducts))
    dispatch({ type: '[CartProducts] - Update product from cart', payload: newCartProducts })
  }

  return (
    <CartProductsContext.Provider
      value={{
        ...state,
        orderSummary,

        // Methods
        addProductToCart,
        removeProductFromCart,
        updateCartProduct
      }}>
      {children}
    </CartProductsContext.Provider>
  )
}