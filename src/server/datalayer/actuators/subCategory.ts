import { mongoConnection } from ".."

import { SubCategoryModel } from '../models'

import { SubCategory } from "@/interfaces"

export const getAllSubCategorySlugs = async (): Promise<string[]> => {
  await mongoConnection.connect()
  const slugs = await SubCategoryModel.distinct('slug')
  await mongoConnection.disconnect()

  return slugs
}

export const getAllSubCategories = async (): Promise<SubCategory[]> => {
  await mongoConnection.connect()
  const subCategories = await SubCategoryModel.find().lean()
  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(subCategories))
}

export const getSubCategoryBySlug = async (slug: string): Promise<SubCategory | null> => {
  await mongoConnection.connect()

  const subCategory = await SubCategoryModel.findOne({ slug }).lean()

  await mongoConnection.disconnect()

  if (!subCategory) return null

  return JSON.parse(JSON.stringify(subCategory))
}
