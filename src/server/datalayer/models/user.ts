import mongoose, { Schema, model, Model } from 'mongoose'

import { AuthProvidersEnum, SizeEnum } from '@/constants'
import { User } from '@/interfaces'

const { Types } = Schema
const { ObjectId } = Types

const UserCartProductSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    enum: {
      values: SizeEnum,
      message: '{VALUE} no es un size valido'
    },
    required: true
  },
  productId: { type: ObjectId, ref: 'Product', required: true }
}, { _id: false })

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: {
    type: String,
    enum: {
      values: AuthProvidersEnum,
      message: `{VALUE} no es un auth provider valido`
    },
    required: true
  },
  favoriteProducts: { type: [ObjectId], default: [] },
  cartProducts: { type: [UserCartProductSchema], default: [] }
}, { timestamps: true })

type UserMongo = User

export const UserModel: Model<UserMongo> = mongoose.models.User ?? model('User', userSchema)