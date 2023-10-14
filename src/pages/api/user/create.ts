import type { NextApiRequest, NextApiResponse } from 'next'

import { createUser, } from '@/server'

import { ShortUser } from '@/interfaces'
import { AuthProvider } from '@/constants'

type Data =
  | { message: string }
  | ShortUser

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'POST':
        return await handleCreateUser(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error createUser:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { firstName, lastName, email, password } = req.body

  await createUser({ email, firstName, provider: AuthProvider.Credentials, lastName, password })

  return res.status(200).json({ message: 'User created' })
}
