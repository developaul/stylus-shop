import { ProductModel, mongoConnection } from "..";

import { Product } from "@/interfaces";

export const getBestProducts = async (): Promise<Pick<Product, '_id' | 'images' | 'title' | 'slug'>[]> => {

  await mongoConnection.connect()

  const bestProducts = await ProductModel
    .aggregate([
      { $match: {} },
      { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { _id: 1, images: 1, title: 1 } },
      { $limit: 15 }
    ])

  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(bestProducts))
}

export const getBestProductsByCategorySlug = async (categorySlug: string): Promise<Pick<Product, '_id' | 'images' | 'title' | 'slug'>[]> => {

  await mongoConnection.connect()

  const bestProducts = await ProductModel
    .aggregate([
      { $match: {} },
      { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $match: { 'category.slug': categorySlug } },
      { $project: { _id: 1, images: 1, title: 1 } },
      { $limit: 15 }
    ])

  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(bestProducts))
}