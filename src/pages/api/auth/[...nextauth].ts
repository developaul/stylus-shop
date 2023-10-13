import { AuthProvider } from "@/constants"
import { checkUser, checkUserByCredentials } from "@/server"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: (credentials): Promise<any> => {
        return checkUser({
          email: credentials?.email ?? '',
          password: credentials?.password ?? '',
          provider: AuthProvider.Credentials
        })
      }
    })
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register'
  },
  callbacks: {
    async jwt({ token, user, account }) {
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