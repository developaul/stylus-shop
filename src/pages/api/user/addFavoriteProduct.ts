import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, mongoConnection } from '@/server'

import { ShortUser } from '@/interfaces'

type Data =
  | { message: string }
  | ShortUser

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await addFavoriteProduct(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error addFavoriteProduct:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const addFavoriteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId, favoriteProductId } = req.body

  await mongoConnection.connect()
  await UserModel.findByIdAndUpdate(userId, { $addToSet: { favoriteProductIds: favoriteProductId } })
  await mongoConnection.disconnect()

  return res.status(200).json({ message: 'Favorite product added from user' })
}
