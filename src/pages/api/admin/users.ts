import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'

import { UserModel, mongoConnection } from '@/server'

import { ShortUser } from '@/interfaces'
import { ShortUserSelect, UserRoleEnum } from '@/constants'

type Data =
  | { message: string }
  | ShortUser[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return await getUsers(req, res)

      case 'PUT':
        return await updateUserRole(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error getUsers:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const getUsers = async (_: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  await mongoConnection.connect()
  const users = await UserModel.find().select(ShortUserSelect).lean()
  await mongoConnection.disconnect()

  return res.status(200).json(users)
}


export const updateUserRole = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const { userId, role } = req.body

  if (!isValidObjectId(userId))
    return res.status(400).json({ message: 'No existe usuario por ese id' })

  if (!UserRoleEnum.includes(role))
    return res.status(400).json({ message: 'Rol no valido' })

  await mongoConnection.connect()
  const user = await UserModel.findById(userId)

  if (!user) {
    await mongoConnection.disconnect()
    return res.status(404).json({ message: `Usuario no encontrado: ${userId}` })
  }

  user.role = role
  await user.save()
  await mongoConnection.disconnect()

  return res.status(200).json({ message: 'Usuario actualizado' })
}
