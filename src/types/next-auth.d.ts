import NextAuth from 'next-auth'
import { NguoiDung } from './NguoiDung'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: NguoiDung
  }

  interface User extends NguoiDung {}
}
