import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, getFavoriteProductsByIds, mongoConnection } from '@/server'

import { FavoriteProduct } from '@/interfaces'

type Data =
  | { message: string }
  | FavoriteProduct[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getFavoriteProducts(req, res)

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

export const getFavoriteProducts = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId } = req.query

  await mongoConnection.connect()
  const user = await UserModel.findById(userId).select({ favoriteProductIds: 1 }).lean()
  await mongoConnection.disconnect()

  if (!user) return res.status(404).json({ message: 'User not found' })

  const favoriteProducts = user.favoriteProductIds.length ? await getFavoriteProductsByIds(user.favoriteProductIds) : []

  return res.status(200).json(favoriteProducts)
}
