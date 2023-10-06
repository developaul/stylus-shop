import { CartProduct } from "@/interfaces";

export const productsAreEqual = (firstProduct: CartProduct, secondProduct: CartProduct) => {
  return (firstProduct._id === secondProduct._id) && (firstProduct.size === secondProduct.size)
}