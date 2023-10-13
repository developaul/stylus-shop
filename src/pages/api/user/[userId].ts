import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, getFavoriteProductsByIds, mongoConnection } from '@/server'

import { ShortUser } from '@/interfaces'

type Data =
  | { name: string }
  | ShortUser

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getUserById(req, res)

      default:
        return res
          .status(400)
          .json({ name: 'Bad request' })
    }
  } catch (error) {
    console.log("error getUserById:", error)
    return res
      .status(500)
      .json({ name: 'Server error' })
  }
}

export const getUserById = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId } = req.query

  await mongoConnection.connect()
  const user = await UserModel.findById(userId)
    .select({
      firstName: 1,
      lastName: 1,
      email: 1,
      cartProducts: 1,
      favoriteProductIds: 1
    })
    .lean()

  if (!user) {
    return res
      .status(400)
      .json({ name: 'User not found' })
  }

  const favoriteProducts = user.favoriteProductIds.length ? await getFavoriteProductsByIds(user.favoriteProductIds) : []

  await mongoConnection.disconnect()

  return res.status(200).json({ ...user, favoriteProducts })
}
