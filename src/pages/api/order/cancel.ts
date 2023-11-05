import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]'

import { OrderModel, mongoConnection } from '@/server'
import { ShortOrder } from '@/interfaces'
import { OrderStatus } from '@/constants'


type Data =
  | { message: string }
  | ShortOrder

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await handleCancelOrder(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error createOrder:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const handleCancelOrder = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ message: 'Session is required' })

  const { orderId } = req.body

  await mongoConnection.connect()
  await OrderModel.findByIdAndUpdate(
    orderId,
    {
      $set: {
        status: OrderStatus.Cancelled,
        cancelledAt: new Date(),
        cancelledById: session.user._id
      }
    }
  )
  await mongoConnection.disconnect()

  return res.status(201).json({ message: 'Orden Cancelada' })
}
