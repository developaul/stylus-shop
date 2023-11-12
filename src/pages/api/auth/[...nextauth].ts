import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { checkUser } from "@/server"
import { AuthProvider } from "@/constants"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
        cartProducts: {},
        favoriteProductIds: {}
      },
      authorize: async (credentials): Promise<any> => {
        const user = await checkUser({
          cartProducts: JSON.parse(credentials?.cartProducts ?? '[]') ?? [],
          favoriteProductIds: JSON.parse(credentials?.favoriteProductIds ?? '[]') ?? [],
          email: credentials?.email ?? '',
          password: credentials?.password ?? '',
          provider: AuthProvider.Credentials
        }).catch(console.log)

        return user
      }
    })
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register'
  },
  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400 // 24h
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (!account) return token

      token.accessToken = account.access_token

      switch (account.type) {
        case 'credentials':
          token.user = user
          break;

        default:
          break;
      }

      return token
    },
    async session({ session, user, token }: any) {
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    }
  }
}

export default NextAuth(authOptions)