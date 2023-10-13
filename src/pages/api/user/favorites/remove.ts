import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, mongoConnection } from '@/server'

type Data =
  | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await removeFavoriteProduct(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error remove favorite product:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const removeFavoriteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId, favoriteProductId } = req.body

  await mongoConnection.connect()
  await UserModel.findByIdAndUpdate(userId, { $pull: { favoriteProductIds: favoriteProductId } })
  await mongoConnection.disconnect()

  return res.status(200).json({ message: 'Favorite product removed from user' })
}
