import mongoose, { Schema, model, Model } from 'mongoose'

import { Category } from '@/interfaces'

const categorySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  icon: { type: String, required: true },
}, { timestamps: true })

type CategoryMongo = Category

export const CategoryModel: Model<CategoryMongo> = mongoose.models.Category ?? model('Category', categorySchema)