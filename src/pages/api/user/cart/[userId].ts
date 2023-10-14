import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, getCartProductsByUser, mongoConnection } from '@/server'

import { CartProduct } from '@/interfaces'

type Data =
  | { message: string }
  | CartProduct[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getCartProducts(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error add Favorite Product:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const getCartProducts = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId } = req.query

  await mongoConnection.connect()
  const user = await UserModel.findById(userId).select({ cartProducts: 1 }).lean()
  await mongoConnection.disconnect()

  if (!user) return res.status(404).json({ message: 'User not found' })

  const cartProducts = user.cartProducts.length ? await getCartProductsByUser(user) : []

  return res.status(200).json(cartProducts)
}
