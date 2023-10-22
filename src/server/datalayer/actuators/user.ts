import bcrypt from 'bcryptjs'

import { mongoConnection } from ".."
import { UserModel } from "../models"

import { TokenUser, UpdateUserArgs, User } from "@/interfaces"
import { AuthProvider } from "@/constants"
import { Validations } from '@/utils'

Validations

interface CreateUserArgs {
  firstName: string,
  lastName?: string,
  email: string,
  password?: string,
  provider: AuthProvider
}

const getUserToCreate = (args: CreateUserArgs) => {
  const {
    firstName,
    lastName,
    password,
    email,
    provider
  } = args

  return {
    firstName,
    lastName,
    email: email.toLowerCase(),
    provider,
    ...password ? { password: bcrypt.hashSync(password) } : {},
  }
}

export const createUser = async (args: CreateUserArgs): Promise<User> => {
  const userToCreate = getUserToCreate(args)

  await mongoConnection.connect()
  const newUser = await UserModel.create(userToCreate)
  await mongoConnection.disconnect()

  return newUser
}

interface CheckUserArgs {
  email: string,
  password: string,
  provider: AuthProvider
}

export const checkUserByCredentials = async ({ email, password }: Omit<CheckUserArgs, 'provider'>): Promise<TokenUser | null> => {

  if (!Validations.isValidEmail(email)) return null

  await mongoConnection.connect()
  const user = await UserModel.findOne({ email })
    .select({
      _id: 1,
      email: 1,
      password: 1
    })
    .lean()
  await mongoConnection.disconnect()

  if (!user) return null

  if (!bcrypt.compareSync(password, user.password!)) return null

  const { password: _, ...restUser } = user

  return restUser
}

export const checkUser = async ({ email, password, provider }: CheckUserArgs): Promise<TokenUser | null> => {

  if (provider === AuthProvider.Credentials)
    return checkUserByCredentials({ email, password })

  // if (provider === AuthProvider.Github)
  // return checkUserByOauth({ email, password })

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