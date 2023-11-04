import type { NextApiRequest, NextApiResponse } from 'next'

import { updateUser, } from '@/server'

import { UpdateUserArgs } from '@/interfaces'


type Data =
  | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await handleUpdateUser(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error updateUser:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const handleUpdateUser = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId, address, city, country, email, phone, zipCode } = req.body as UpdateUserArgs

  try {
    await updateUser({ userId, address, city, country, email, phone, zipCode })
    return res.status(200).json({ message: 'User updated' })
  } catch (error: any) {
    return res.status(401).json({ message: error.message })
  }
}
