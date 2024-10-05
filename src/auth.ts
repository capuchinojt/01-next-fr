import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { InactiveAccountError, InvalidLoginError } from '@/utils/error'
import { commonFetch } from '@/utils/api'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      
      authorize: async (credentials) => {
        console.log('>> credentials:: ', credentials)

        const { data, error } = await commonFetch(
          'https://localhost:8080/api/v1/auth/signIn',
          {
            method: 'POST',
            body: {...credentials}, 
          }
        )

        if (error) {
          throw new Error(`Error fetching data:: ${error}`)
        }
        if (!data) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          // throw new InvalidLoginError()
          throw new InvalidLoginError()
        }

        // return user object with their profile data
        return data
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
})
