import { CartProduct, UserCartProduct } from "@/interfaces";

export const productsAreEqual = (firstProduct: CartProduct, secondProduct: CartProduct) => {
  return (firstProduct._id === secondProduct._id) && (firstProduct.size === secondProduct.size)
}

export const transformToUserCartProduct = (products: CartProduct[]): UserCartProduct[] =>
  products.map((product) => ({
    productId: product._id,
    quantity: product.quantity,
    size: product.size!
  }))