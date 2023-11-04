
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