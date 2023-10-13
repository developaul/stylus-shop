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
      authorize: async (credentials): Promise<any> => {

        console.log({ credentials })

        const user = await checkUser({
          email: credentials?.email ?? '',
          password: credentials?.password ?? '',
          provider: AuthProvider.Credentials
        }).catch(console.log)
        console.log('AFTER', { user })

        return user
      }
    })
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register'
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

      console.log("🚀 ~ file: [...nextauth].ts:49 ~ jwt ~ token:", token)
      return token
    },
    async session({ session, user, token }: any) {
      session.accessToken = token.accessToken
      session.user = token.user

      console.log("🚀 ~ file: [...nextauth].ts:55 ~ session ~ session:", session)
      return session
    }
  }
}

export default NextAuth(authOptions)