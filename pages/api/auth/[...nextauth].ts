import nguoiDungServices from '@services/nguoiDungServices'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        cif: { label: 'Số CIF', type: 'text' },
      },
      authorize: async (credentials) => {
        try {
          const user = await nguoiDungServices.getNguoiDung(credentials?.cif)
          if (user.data) {
            return user.data
          } else {
            return null
          }
        } catch (error: any) {
          const errorMessage = error?.response.data.message[0].messages[0].message
          throw new Error(errorMessage)
        }
      },
    }),
  ],
  secret: 'f5seconds',
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          id: user.id,
          hoTen: user.hoTen,
          soDiem: user.soDiem,
          cif: user.cif,
        }
      }
      console.log({ token })

      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
        console.log({ session })
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
})
