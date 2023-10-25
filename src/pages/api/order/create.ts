import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]'

import { createOrder } from '@/server'
import { ShortOrder } from '@/interfaces'


type Data =
  | { message: string }
  | ShortOrder

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await handleCreateOrder(req, res)

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

export const handleCreateOrder = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ message: 'Session is required' })

  const { orderProducts, orderSummary, shippingAddress } = req.body

  try {
    const order = await createOrder({ createdById: session.user._id, orderProducts, orderSummary, shippingAddress })
    return res.status(201).json(order)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}
