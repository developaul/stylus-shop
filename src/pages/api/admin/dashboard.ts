import type { NextApiRequest, NextApiResponse } from 'next'

import { OrderModel, ProductModel, UserModel, mongoConnection } from '@/server'

import { DashboardInfo } from '@/interfaces'
import { OrderStatus, UserRole } from '@/constants'

type Data =
  | { message: string }
  | DashboardInfo

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getDashboardInfo(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error getDashboardInfo:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const getDashboardInfo = async (_: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  await mongoConnection.connect()

  const [
    numberOfOrders,
    paidOrders,
    cancelledOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    OrderModel.countDocuments(),
    OrderModel.countDocuments({ status: OrderStatus.Paid }),
    OrderModel.countDocuments({ status: OrderStatus.Cancelled }),
    UserModel.countDocuments({ role: UserRole.Client }),
    ProductModel.countDocuments(),
    ProductModel.countDocuments({ inStock: 0 }),
    ProductModel.countDocuments({ inStock: { $lte: 10 } })
  ])
  await mongoConnection.disconnect()

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders - cancelledOrders,
    cancelledOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory
  })
}
