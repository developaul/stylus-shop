import mongoose, { Schema, model, Model } from 'mongoose'

import { Product } from '@/interfaces'
import { SizeEnum } from '@/constants'

const productSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  inStock: { type: Number, required: true, default: 0 },
  sizes: [{
    type: String,
    enum: {
      values: SizeEnum,
      message: '{VALUE} no es un size valido'
    },
    required: true
  }],
  price: { type: Number, required: true, default: 0 },
  categoryId: {
    ref: 'Category',
    type: Schema.ObjectId,
    required: true,
  },
  subCategoryId: {
    ref: 'SubCategory',
    type: Schema.ObjectId,
    required: true,
  },
}, { timestamps: true })

productSchema.index({ title: 'text' })

type ProductMongo = Omit<Product, 'category' | 'subCategory'>

export const ProductModel: Model<ProductMongo> = mongoose.models.Product ?? model('Product', productSchema)