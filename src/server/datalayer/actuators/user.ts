import bcrypt from 'bcryptjs'

import { mongoConnection } from ".."
import { UserModel } from "../models"

import { AuthProvider } from "@/constants"
import { ShortUser, User } from "@/interfaces"


export const getUserById = async (userId: string): Promise<ShortUser> => {
  await mongoConnection.connect()
  const user = await UserModel.findById(userId)
    .select({
      firstName: 1,
      lastName: 1,
      email: 1,
      cartProducts: 1,
      favoriteProducts: 1
    })
    .lean()

  // if (!user) return null

  await mongoConnection.disconnect()

  return user!
}


interface CreateUserArgs {
  firstName: string,
  lastName?: string,
  email: string,
  password?: string,
  provider: AuthProvider
}

export const getUserToCreate = (args: CreateUserArgs) => {
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

export const checkUserByCredentials = async ({ email, password }: Omit<CheckUserArgs, 'provider'>): Promise<ShortUser | null> => {
  await mongoConnection.connect()
  const user = await UserModel.findOne({ email })
    .select({
      firstName: 1,
      lastName: 1,
      email: 1,
      cartProducts: 1,
      favoriteProducts: 1,
      password: 1
    })
    .lean()
  await mongoConnection.disconnect()

  if (!user) return null

  if (!bcrypt.compareSync(password, user.password!)) return null

  const { password: _, ...restUser } = user

  return restUser
}

export const checkUser = async ({ email, password, provider }: CheckUserArgs): Promise<ShortUser | null> => {

  if (provider === AuthProvider.Credentials)
    return checkUserByCredentials({ email, password })

  // if (provider === AuthProvider.Github)
  // return checkUserByOauth({ email, password })

  return null
}