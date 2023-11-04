import type { NextApiRequest, NextApiResponse } from 'next'

import { UserModel, mongoConnection } from '@/server'

import { ShortUser } from '@/interfaces'

type Data =
  | { message: string }
  | ShortUser

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getUserById(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error getUserById:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
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
      country: 1,
      address: 1,
      zipCode: 1,
      phone: 1,
      city: 1,
      role: 1
    })
    .lean()
  await mongoConnection.disconnect()

  if (!user) {
    return res
      .status(400)
      .json({ message: 'User not found' })
  }

  return res.status(200).json(user)
}
