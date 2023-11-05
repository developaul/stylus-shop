import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductModel, mongoConnection } from '@/server'

import { Product } from '@/interfaces'

type Data =
  | { message: string }
  | Product[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getProducts(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error getProducts:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const getProducts = async (_: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  await mongoConnection.connect()
  const products: Product[] = await ProductModel
    .aggregate([
      { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
      { $lookup: { from: 'subcategories', localField: 'subCategoryId', foreignField: '_id', as: 'subCategory' } },
      { $unwind: '$category' },
      { $unwind: '$subCategory' },
    ])
  await mongoConnection.disconnect()

  return res.status(200).json(products)
}
