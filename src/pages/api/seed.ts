import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoConnection, SubCategoryModel, CategoryModel, } from '@/server'

import { Seed } from '@/constants'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({ message: 'No tiene acceso a este servicio' })
  }

  await mongoConnection.connect()

  await CategoryModel.deleteMany()

  await CategoryModel.insertMany(Seed.categories)
  await SubCategoryModel.insertMany(Seed.subCategories)

  await mongoConnection.disconnect()

  res
    .status(200)
    .json({ message: 'Proceso realizado correctamente' })
}