import { mongoConnection } from ".."
import { CategoryModel } from "../models"

import { Category } from "@/interfaces"

export const getAllCategorySlugs = async (): Promise<string[]> => {
  await mongoConnection.connect()
  const slugs = await CategoryModel.distinct('slug')
  await mongoConnection.disconnect()

  return slugs
}

export const getAllCategories = async (): Promise<Category[]> => {
  await mongoConnection.connect()
  const categories = await CategoryModel.find().lean()
  await mongoConnection.disconnect()

  return JSON.parse(JSON.stringify(categories))
}

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  await mongoConnection.connect()

  const category = await CategoryModel.findOne({ slug }).lean()

  await mongoConnection.disconnect()

  if (!category) return null

  return JSON.parse(JSON.stringify(category))
}
