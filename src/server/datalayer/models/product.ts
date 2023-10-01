import mongoose, { Schema, model, Model } from 'mongoose'

import { Product, SizeEnum } from '@/interfaces'

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
    type: Schema.ObjectId,
    required: true,
  },
  subCategory: {
    type: Schema.ObjectId,
    required: true,
  },
}, { timestamps: true })

productSchema.index({ title: 'text' })

type ProductMongo = Omit<Product, 'category' | 'subCategory'>

const ProductModel: Model<ProductMongo> = mongoose.models.Product ?? model('Product', productSchema)

export default ProductModel