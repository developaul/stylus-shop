import { keyBy } from "@/utils";
import { ProductModel, getCategoryById, getSubCategoryById, mongoConnection } from "..";

import { CartProduct, FavoriteProduct, Product, ShortProduct, User } from "@/interfaces";

export const getBestProducts = async (): Promise<ShortProduct[]> => {

  await mongoConnection.connect()

  const bestProducts = await ProductModel
    .aggregate([
      { $match: {} },
      { $project: { _id: 1, images: 1, title: 1, slug: 1 } },
      { $limit: 15 }
    ])

  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(bestProducts))
}

export const getBestProductsByCategorySlug = async (categorySlug: string): Promise<ShortProduct[]> => {

  await mongoConnection.connect()

  const bestProducts = await ProductModel
    .aggregate([
      { $match: {} },
      { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $match: { 'category.slug': categorySlug } },
      { $project: { _id: 1, images: 1, title: 1, slug: 1 } },
      { $limit: 15 }
    ])

  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(bestProducts))
}

export const getRelatedProductsByProduct = async (product: Product): Promise<ShortProduct> => {
  await mongoConnection.connect()
  const relatedProducts = await ProductModel
    .find({
      _id: { $ne: product._id },
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId
    })
    .limit(15)
    .lean()
  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(relatedProducts))
}

export const getAllProductSlugs = async (): Promise<string[]> => {

  await mongoConnection.connect()
  const productSlugs = await ProductModel.distinct('slug')
  await mongoConnection.disconnect()

  return productSlugs
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  await mongoConnection.connect()
  const product = await ProductModel.findOne({ slug }).lean()

  if (!product) {
    await mongoConnection.disconnect()
    return null
  }

  const [category, subCategory] = await Promise.all([
    getCategoryById(product.categoryId),
    getSubCategoryById(product.subCategoryId)
  ])

  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify({ ...product, category, subCategory }))
}

export const getFavoriteProductsByIds = async (productIds: string[]): Promise<FavoriteProduct[]> => {
  await mongoConnection.connect()

  const products = await ProductModel
    .find({ _id: { $in: productIds } })
    .select({
      _id: 1,
      slug: 1,
      images: 1,
      title: 1
    })
    .lean()
  await mongoConnection.disconnect()

  return products.map(({ images, ...rest }) => ({ ...rest, image: images[0] }))
}

export const getCartProductsByUser = async (user: Pick<User, '_id' | 'cartProducts'>): Promise<CartProduct[]> => {
  const productIds = user.cartProducts.map(({ productId }) => productId)

  await mongoConnection.connect()
  const products = await ProductModel
    .find({ _id: { $in: productIds } })
    .select({
      _id: 1,
      slug: 1,
      title: 1,
      images: 1,
      inStock: 1,
      price: 1,
    })
    .lean()
  await mongoConnection.disconnect()

  const productBy = keyBy(products, '_id')

  return user.cartProducts.map(({ productId, quantity, size }) => {
    const product = productBy[productId]
    const { images, ...restProduct } = product

    return {
      ...restProduct,
      image: images[0],
      quantity,
      size
    }
  })
}