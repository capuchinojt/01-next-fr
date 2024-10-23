'use server'
import { signIn } from '@/auth'
import { ERROR_CODES, ErrorCustomType, errors, errorsByCode } from '@/types/error.type'

export async function authenticate(email: string, password: string) {
  try {
    const result = await signIn('credentials', {
      username: email,
      password: password,
      callbackUrl: '/',
      redirect: false,
    })
    console.log('success authenticate data:: ', result)
    return result
  } catch (error: ErrorCustomType | any) {
    const errorByCode = errors.get(error?.type) || errorsByCode[ERROR_CODES.INTERNAL_SERVER_ERROR]
    console.log('>>> check error authenticate:: ', errorByCode)
    return {
      error: errorByCode
    }
  }
}
