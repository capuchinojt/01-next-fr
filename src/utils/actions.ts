'use server'
import { signIn } from '@/auth'
import { ErrorCustomType, errors } from '@/types/error.type'

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
  return errors[error?.name as keyof typeof errors] ?? errors.InternalServerError
}

export const checkErrorByCode = async (code: number) => {
  const errorEntry = Object.values(errors).find((entry) => entry.code === code)

  return (
    errorEntry ?? errors.InternalServerError
  )
}

