import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { sendRequest } from '@/utils/api'
import { IUser, SignInResponse } from '@/types/backend'
import {
  ERROR_CODES,
  InactiveAccountError,
  InternalServerError,
  InvalidLoginError,
} from '@/types/error.type'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },

      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new InvalidLoginError()
        }

        const response = await sendRequest(
          '/api/v1/auth/signIn',
          {
            method: 'POST',
            body: {
              email: credentials?.username,
              password: credentials?.password,
            } as { email: string; password: string },
          }
        ) as { data?: any; error?: any, status?: number }

        const { data, error } = response

        if (error) {
          console.log(`>> Response for error case:: `, error)
        }
        if (response?.status === 200) {
          const { user } = data?.data as SignInResponse
          if (!user) {
            throw new InvalidLoginError()
          }
          console.log('>> Response for success case:: ', user)
          return user
        } else if (error?.code === ERROR_CODES.INACTIVE_ACCOUNT) {
          throw new InactiveAccountError()
        } else if (error?.code === ERROR_CODES.INVALID_LOGIN_CREDENTIALS) {
          throw new InvalidLoginError()
        } else {
          throw new InternalServerError()
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt({ token, user }) {
      // console.log('check data callback jwt:: ', {token, user})
      if (user) { // User is available during sign-in
        token.user = (user as IUser)
      }
      return token
    },
    session({ session, token }) {
      if (token?.user) {
        (session.user as IUser) = token.user
      }
      return session
    },
    authorized: async ({ auth }) => {
      // console.log('>> check data callback authorized:: ', auth)
      return !!auth
    }
  },
})
