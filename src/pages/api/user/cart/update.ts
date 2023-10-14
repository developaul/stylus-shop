import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, mongoConnection } from '@/server'

type Data =
  | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await updateCartProducts(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("Error update cart products:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const updateCartProducts = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId, cartProducts } = req.body

  await mongoConnection.connect()
  await UserModel.findByIdAndUpdate(userId, { $set: { cartProducts } })
  await mongoConnection.disconnect()

  return res.status(200).json({ message: 'Cart products updated from user' })
}
