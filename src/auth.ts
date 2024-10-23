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

const host =
  'https://9000-idx-02-nest-begit-1726557855514.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev'
  // 'http://localhost:8080'

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

        const headers = {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LTAyLW5lc3QtYmVnaXQtMTcyNjU1Nzg1NTUxNC5jbHVzdGVyLWEzZ3JqemVrNjVjeGV4NzYyZTRtd3J6bDQ2LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyOTY1MzQxNywiZXhwIjoxNzI5NjU3MDE3fQ.MoZHom6aUW2MXlsQXOaRFAfqQUddierAgeIYlDoyyvaNdqOvzhLj0D6RJZKWMSv_caLsB_vjDywCboOV273xZyuVQuCUycPCYgmzUur9LGYVo_Px_9zlO_Zk9UyxnUuwDbooNRcgKa1ZFGAEeQd_R6TAZ5ML86q1blByKty1qb0xRe6uLhQD3ZpLWqwBQEO6Qdb7euLjZx000FqmZZmrewaDh7u25wJusLgrUTOpznscL6HfWkt7eS9sznpzwOUWpqsKhrG2LS6W104XhdpvvYMN5CQE8ejuVBnNGh3BIcz8pbL5HcCHlQe2JYEOXggttVEYleVH1rQ2D8HGIoT_yw',
        }

        const response = await sendRequest(
          `${host}/api/v1/auth/signIn`,
          {
            method: 'POST',
            body: {
              email: credentials?.username,
              password: credentials?.password,
            } as { email: string; password: string },
            headers,
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
