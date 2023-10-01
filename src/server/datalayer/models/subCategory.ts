import mongoose, { Schema, model, Model } from 'mongoose'

import { SubCategory } from '@/interfaces'

const subCategorySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
}, { timestamps: true })

type SubCategoryMongo = SubCategory

export const SubCategoryModel: Model<SubCategoryMongo> = mongoose.models.SubCategory ?? model('SubCategory', subCategorySchema)