'use server'
import { signIn } from '@/auth'
import { ErrorCustomType, ERROR_CODES } from '@/types/Error.type'

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn('credentials', {
      username: email,
      password: password,
      callbackUrl: '/',
      redirect: false,
    })
    return r
  } catch (error) {
    console.log('>> check error authenticate:: ', JSON.stringify(error))
    return checkError(error as ErrorCustomType)
  }
}

const checkError = (error: ErrorCustomType) => {
  const errors = {
    InvalidLoginError: {
      error: 'Incorrect username or password',
      code: ERROR_CODES.INVALID_LOGIN_CREDENTIALS
    },
    InternalError: {
      error: 'Something went wrong, please try again later',
      code: ERROR_CODES.INTERNAL_SERVER_ERROR
    },
    InactiveAccountError: {
      error: 'Your account is not active',
      code: ERROR_CODES.UNAUTHORIZED
    }
  }

  return errors[error?.name as keyof typeof errors] ?? {
    error: 'Something went wrong, please try again later',
    code: ERROR_CODES.INTERNAL_SERVER_ERROR
  }
}
