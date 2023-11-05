
export const enum AuthProvider {
  Credentials = 'credentials',
  Github = 'github',
  Google = 'google'
}

export const AuthProvidersEnum = [
  AuthProvider.Credentials,
  AuthProvider.Github,
  AuthProvider.Google
]

export const enum UserRole {
  Client = 'CLIENT',
  Admin = 'ADMIN'
}

export const UserRoleEnum = [
  UserRole.Client,
  UserRole.Admin
]

export const UserRoleOptions = [
  { value: UserRole.Admin, label: 'Admin' },
  { value: UserRole.Client, label: 'Cliente' }
]

export const ShortUserSelect = {
  _id: 1,
  firstName: 1,
  lastName: 1,
  email: 1,
  country: 1,
  address: 1,
  zipCode: 1,
  phone: 1,
  city: 1,
  role: 1
}

export const TokenUserSelect = {
  _id: 1,
  email: 1,
  password: 1,
  role: 1
}