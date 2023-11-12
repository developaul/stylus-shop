import bcrypt from 'bcryptjs'

import { mongoConnection } from ".."
import { UserModel } from "../models"

import { TokenUser, UpdateUserArgs, User, UserCartProduct } from "@/interfaces"
import { AuthProvider, TokenUserSelect, UserRole } from "@/constants"
import { Validations } from '@/utils'

Validations

interface CreateUserArgs {
  firstName: string,
  lastName?: string,
  email: string,
  password?: string,
  provider: AuthProvider
}

const getUserToCreate = async (args: CreateUserArgs) => {
  const {
    firstName,
    lastName,
    password,
    email,
    provider
  } = args

  await mongoConnection.connect()
  const exists = await UserModel.exists({ email })
  if (exists) {
    await mongoConnection.disconnect()
    throw new Error('Ya existe un usuario con ese email')
  }
  await mongoConnection.disconnect()

  return {
    firstName,
    lastName,
    role: UserRole.Client,
    email: email.toLowerCase(),
    provider,
    ...password ? { password: bcrypt.hashSync(password) } : {},
  }
}

export const createUser = async (args: CreateUserArgs): Promise<User> => {
  const userToCreate = await getUserToCreate(args)

  await mongoConnection.connect()
  const newUser = await UserModel.create(userToCreate)
  await mongoConnection.disconnect()

  return newUser
}

interface CheckUserArgs {
  email: string,
  password: string,
  provider: AuthProvider
  favoriteProductIds: string[],
  cartProducts: UserCartProduct[]
}

export const checkUserByCredentials = async ({ email, password }: Omit<CheckUserArgs, 'provider' | 'cartProducts' | 'favoriteProductIds'>): Promise<TokenUser | null> => {

  if (!Validations.isValidEmail(email)) return null

  await mongoConnection.connect()
  const user = await UserModel.findOne({ email })
    .select({
      ...TokenUserSelect,
      password: 1
    })
    .lean()
  await mongoConnection.disconnect()

  if (!user) return null

  if (!bcrypt.compareSync(password, user.password!)) return null

  const { password: _, ...restUser } = user

  return restUser
}

export const checkUser = async ({ email, password, provider, cartProducts, favoriteProductIds }: CheckUserArgs): Promise<TokenUser | null> => {

  if (provider === AuthProvider.Credentials) {
    const user = await checkUserByCredentials({ email, password })

    if (!user) return null

    await updateCartProductsAndFavorites({ userId: user._id, cartProducts, favoriteProductIds })

    return user
  }

  return null
}

const getUserFieldsToUpdate = async ({ address, city, country, email, phone, userId, zipCode }: UpdateUserArgs) => {
  if (!Validations.isValidEmail(email)) throw new Error('El email es invalido')

  mongoConnection.connect()
  const userExists = await UserModel.exists({ email, _id: { $ne: userId } })
  mongoConnection.disconnect()

  if (userExists) throw new Error('El email ya esta en uso')


  return {
    address,
    city,
    country,
    phone,
    userId,
    zipCode
  }
}

export const updateUser = async (args: UpdateUserArgs): Promise<void> => {
  const userFieldsToUpdate = await getUserFieldsToUpdate(args)

  mongoConnection.connect()
  await UserModel.findByIdAndUpdate(args.userId, { $set: userFieldsToUpdate })
  mongoConnection.disconnect()
}

interface UpdateCartProductsAndFavoritesArgs {
  favoriteProductIds: string[],
  cartProducts: UserCartProduct[],
  userId: string
}

export const updateCartProductsAndFavorites = async ({ userId, cartProducts, favoriteProductIds }: UpdateCartProductsAndFavoritesArgs): Promise<void> => {

  await mongoConnection.connect()
  await UserModel.findByIdAndUpdate(userId, { $set: { cartProducts, favoriteProductIds } })
  await mongoConnection.disconnect()

}