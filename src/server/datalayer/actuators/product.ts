import { ProductModel, getCategoryById, getSubCategoryById, mongoConnection } from "..";

import { Product, ShortProduct } from "@/interfaces";

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
    .find({ categoryId: product.categoryId, subCategoryId: product.subCategoryId })
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