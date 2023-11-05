import type { NextApiRequest, NextApiResponse } from 'next'

import { OrderModel, mongoConnection } from '@/server'

import { ShortOrder } from '@/interfaces'
import { CreatedByUserSelect, ShortOrderSelect } from '@/constants'

type Data =
  | { message: string }
  | ShortOrder[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getOrders(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error getOrders:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const getOrders = async (_: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  await mongoConnection.connect()
  const orders: ShortOrder[] = await OrderModel
    .aggregate([
      { $match: {} },
      { $lookup: { from: 'users', localField: 'createdById', foreignField: '_id', as: 'createdBy' } },
      { $unwind: '$createdBy' },
      { $project: { ...ShortOrderSelect, createdBy: CreatedByUserSelect } },
    ])
  await mongoConnection.disconnect()

  return res.status(200).json(orders)
}
