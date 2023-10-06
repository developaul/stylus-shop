import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductModel, mongoConnection } from '@/server'

import { Paginate, PreviewProduct } from '@/interfaces'
import { Order } from '@/constants'

type Data =
  | { name: string }
  | Paginate<PreviewProduct[]>

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)

    default:
      return res
        .status(400)
        .json({ name: 'Bad request' })
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const {
    sizes = [],
    order = Order.Desc,
    page = 1,
    limit = 15,
    categoryId = '',
    subCategoryId = ''
  } = req.query as any

  if (!categoryId || !subCategoryId) {
    return res
      .status(400)
      .json({ name: 'Bad request' })
  }

  const skip = (Number(page) - 1) * Number(limit)
  const sizesArray = sizes.length ? sizes.split(',') : []

  const query = { ...sizesArray.length ? { sizes: { $in: sizesArray } } : {}, categoryId, subCategoryId }

  await mongoConnection.connect()
  const [products, quantityProducts] = await Promise.all([
    ProductModel
      .find(query)
      .select({ _id: 1, images: 1, title: 1, slug: 1, price: 1, inStock: 1 })
      .sort({ createdAt: order })
      .skip(skip)
      .limit(limit)
      .lean(),
    ProductModel.countDocuments(query)
  ])
  await mongoConnection.disconnect()

  const hasNextPage = quantityProducts > (page * products.length)
  const pages = Math.ceil(quantityProducts / limit)

  return res
    .status(200)
    .json({
      info: {
        pages,
        hasNextPage,
        nextPage: hasNextPage ? page + 1 : null
      },
      docs: products
    })
}