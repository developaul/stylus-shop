import { FC, ReactElement, useEffect, useMemo, useReducer } from 'react'
import { useSession } from 'next-auth/react'

import { CartProductsContext, cartProductsReducer } from './'

import { CartProduct, OrderProduct, ShippingAddress, ShortOrder } from '@/interfaces'
import { Product } from '@/utils'
import { userDataSource, orderDataSource } from '@/datasources'

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
  const { data, status } = useSession()
  const user = data?.user

  const [state, dispatch] = useReducer(cartProductsReducer, CartProducts_INITIAL_STATE)

  useEffect(() => {
    try {
      const cartProducts = JSON.parse(localStorage.getItem('cart') ?? '') ?? []
      loadCartProducts(cartProducts)
    } catch (error) {
      loadCartProducts([])
    }
  }, [])

  useEffect(() => {
    if (['unauthenticated', 'loading'].includes(status) || !user) return

    loadCartProductsFromDb(user._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, status])


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

  const loadCartProductsFromDb = async (userId: string) => {
    try {
      const cartProducts = await userDataSource.getCartProducts(userId)
      loadCartProducts(cartProducts)
    } catch (error) {
      console.error(error)
    }
  }

  const loadCartProducts = (cartProducts: CartProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(cartProducts))
    dispatch({ type: '[CartProducts] - Load cart products', payload: cartProducts })
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

    if (user) {
      const newUserCartProducts = Product.transformToUserCartProduct(newCartProducts)
      userDataSource.updateCartProducts(user._id, newUserCartProducts)
    }

    localStorage.setItem('cart', JSON.stringify(newCartProducts))
    dispatch({ type: '[CartProducts] - Add product to cart', payload: newCartProducts })
  }

  const removeProductFromCart = (newCartProduct: CartProduct) => {
    const newCartProducts = state.cartProducts
      .filter(cartProduct => !Product.productsAreEqual(cartProduct, newCartProduct))

    if (user) {
      const newUserCartProducts = Product.transformToUserCartProduct(newCartProducts)
      userDataSource.updateCartProducts(user._id, newUserCartProducts)
    }

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

    if (user) {
      const newUserCartProducts = Product.transformToUserCartProduct(newCartProducts)
      userDataSource.updateCartProducts(user._id, newUserCartProducts)
    }

    localStorage.setItem('cart', JSON.stringify(newCartProducts))
    dispatch({ type: '[CartProducts] - Update product from cart', payload: newCartProducts })
  }

  const cleanCartProducts = () => {
    localStorage.setItem('cart', JSON.stringify([]))
    dispatch({ type: '[CartProducts] - Clean cart products' })
  }

  const createOrder = async (shippingAddress: ShippingAddress): Promise<ShortOrder> => {
    try {
      const orderProducts: OrderProduct[] = state.cartProducts.map(cartProduct => {
        const { _id, inStock, size, ...restCartProduct } = cartProduct

        return {
          ...restCartProduct,
          productId: _id,
          size: size!
        }
      })

      const order = await orderDataSource.createOrder({
        orderSummary,
        orderProducts,
        shippingAddress
      })

      cleanCartProducts()

      return order
    } catch (error) {
      throw error
    }
  }

  return (
    <CartProductsContext.Provider
      value={{
        ...state,
        orderSummary,

        // Methods
        addProductToCart,
        removeProductFromCart,
        updateCartProduct,
        createOrder
      }}>
      {children}
    </CartProductsContext.Provider>
  )
}