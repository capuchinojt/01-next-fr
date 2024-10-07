import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { CustomAuthError } from '@/utils/error'
import { commonFetch } from '@/utils/api'
import { checkErrorByCode } from '@/utils/actions'
import { SignInResponse } from '@/types/backend'
import {
  ErrorExpendCustomType,
  InactiveAccountError,
  InvalidLoginError,
} from '@/types/error.type'

const host =
  'https://9000-idx-02-nest-begit-1726557855514.cluster-a3grjzek65cxex762e4mwrzl46.cloudworkstations.dev'

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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LTAyLW5lc3QtYmVnaXQtMTcyNjU1Nzg1NTUxNC5jbHVzdGVyLWEzZ3JqemVrNjVjeGV4NzYyZTRtd3J6bDQ2LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyODI3MjQ3MSwiZXhwIjoxNzI4Mjc2MDcxfQ.iw5voV7pp5R2yQDhonWYMGFRh7WgiNzN0T9fnfOfUHd5-8s9qYT8M1BGa1-cTL-kWOvJ-1xs9SK2BLczeUTBHdOgly-nC38JSIZwIUT2J7WJ28Jnf-Iked9U3gM_qEA_Oqu62cxVmIl9CZpgi8t8wd950w4V_rW78Tm3a-yzuuT3YfeALMFdjpFlUPHUft0ZR_WuV13wGYqu3ELklbI-Hn8Npp2-zswjEY1ERBf6bfD2Mw0pXJEzVxDVSoPwB6OoD95IIw3c945RGxxuxgYBLlr4jLukR1rtMopx4d_x3J63FcHVAkxm_bnGpqB6WkBZGb12jj4qBe60N2eUPHg4AA',
        }

        const response = await commonFetch(
          `${host}/api/v1/auth/signIn`,
          {
            method: 'POST',
            body: {
              email: credentials?.username,
              password: credentials?.password,
            } as { email: string; password: string },
            headers,
          }
        )

        console.log('>> check response:: ', response)
        const { data, error } = response

        if (!data || error) {
          console.error(`Error fetching data Error::[${error?.code}] - ${error?.message}`)
          const customError = await checkErrorByCode(error?.code || 500)
          console.log('>> check customError:: ', customError)
          throw new CustomAuthError(
            customError.error as ErrorExpendCustomType,
            customError.code
          )
        }

        const { user } = data as SignInResponse
        if (!data) {
          throw new InvalidLoginError()
        }

        if (!user?.isActive) {
          throw new InactiveAccountError()
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
})
