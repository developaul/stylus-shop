import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary'
import { isValidObjectId } from 'mongoose'

import { ProductModel, mongoConnection } from '@/server'

import { Product, ProductFormData } from '@/interfaces'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

type Data =
  | { message: string }
  | Product[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    switch (req.method) {
      case 'GET':
        return getProducts(req, res)
      case 'PUT':
        return updateProduct(req, res)

      case 'POST':
        return createProduct(req, res)

      default:
        return res
          .status(400)
          .json({ message: 'Bad request' })
    }
  } catch (error) {
    console.log("error getProducts:", error)
    return res
      .status(500)
      .json({ message: 'Server error' })
  }
}

export const getProducts = async (_: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  await mongoConnection.connect()
  const products: Product[] = await ProductModel
    .aggregate([
      { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
      { $lookup: { from: 'subcategories', localField: 'subCategoryId', foreignField: '_id', as: 'subCategory' } },
      { $unwind: '$category' },
      { $unwind: '$subCategory' },
    ])
  await mongoConnection.disconnect()

  return res.status(200).json(products)
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = [] } = req.body as ProductFormData

  if (!isValidObjectId(_id)) return res.status(400).json({ message: 'El id del producto no es valido' })

  if (images.length < 2) return res.status(400).json({ message: 'Es necesario al menos 2 imagenes' })

  try {
    await mongoConnection.connect()
    const product = await ProductModel.findById(_id)

    if (!product) {
      await mongoConnection.disconnect()
      return res.status(400).json({ message: 'No existe ese producto' })
    }

    product.images.forEach(async (image) => {
      if (images.includes(image) || !image.startsWith('https')) return

      const [fileId] = image.substring(image.lastIndexOf('/') + 1).split('.')

      await cloudinary.uploader.destroy(fileId)
    })

    await product.updateOne(req.body)

    await mongoConnection.disconnect()

    return res.status(200).json({ message: 'Producto actualizado' })
  } catch (error) {
    console.log('updateProduct error -> ', error)
    await mongoConnection.disconnect()
    return res.status(400).json({ message: 'Revisar la consola del servidor' })
  }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [], slug } = req.body as Omit<ProductFormData, '_id'>

  if (images.length < 2) return res.status(400).json({ message: 'Es necesario al menos 2 imagenes' })

  try {
    await mongoConnection.connect()

    const productInDB = await ProductModel.findOne({ slug }).lean()
    if (productInDB) {
      await mongoConnection.disconnect()
      return res.status(400).json({ message: 'Ya existe un producto con ese slug' })
    }

    const product = new ProductModel(req.body)
    product.save()
    await mongoConnection.disconnect()

    return res.status(201).json({ message: 'Producto creado' })
  } catch (error) {
    console.log('createProduct error -> ', error)
    await mongoConnection.disconnect()
    return res.status(400).json({ message: 'Revisar la consola del servidor' })
  }
}
