import { AuthError } from "next-auth"

export type ErrorCustomType = {
  name: string
  type: string
  kind: string
}

export const ERROR_CODES = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,

  // Error code for application
  INVALID_LOGIN_CREDENTIALS: 1001,
  USER_NOT_FOUND: 1002,
  PASSWORD_RESET_FAILED: 1003,
  EMAIL_ALREADY_EXISTS: 1004,
  CONTENT_CANNOT_BE_EMPTY: 1005,
  INACTIVE_ACCOUNT: 1006,
}

export const getErrorKeyByCode = (code: number): string | undefined => {
  const entry = Object.entries(ERROR_CODES).find(([, value]) => value === code)

  return entry ? entry[0] : undefined
}

export type ErrorExpendCustomType = AuthError['type'] & {
  InvalidLoginError: typeof InvalidLoginError,
  InactiveAccountError: typeof InactiveAccountError,
  InternalServerError: typeof InternalServerError,
  Unauthorized: typeof Unauthorized
}

export class InvalidLoginError extends AuthError {
  static readonly type = getErrorKeyByCode(ERROR_CODES.INVALID_LOGIN_CREDENTIALS)
  constructor(message?: string){
    super()
    this.message = message || 'Incorrect username or password'
  }
}

export class InactiveAccountError extends AuthError {
  static readonly type = getErrorKeyByCode(ERROR_CODES.INACTIVE_ACCOUNT)
}

export class InternalServerError extends AuthError {
  static readonly type = getErrorKeyByCode(ERROR_CODES.INTERNAL_SERVER_ERROR)
}

export class Unauthorized extends AuthError {
  static readonly type = getErrorKeyByCode(ERROR_CODES.UNAUTHORIZED)
}

export const errorsByCode = {
  [ERROR_CODES.INVALID_LOGIN_CREDENTIALS]: {
    error: 'InvalidLoginError',
    message: 'Incorrect username or password',
  },
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: {
    error: 'InternalServerError',
    message: 'Something went wrong, please try again later',
  },
  [ERROR_CODES.INACTIVE_ACCOUNT]: {
    error: 'InactiveAccountError',
    message: 'Your account is not active',
  },
  [ERROR_CODES.UNAUTHORIZED]: {
    error: 'Unauthorized',
    message: 'Unauthorized access',
  },
}

export const errors = new Map([
  [
    'INVALID_LOGIN_CREDENTIALS',
    {
      message: 'Incorrect username or password',
      code: ERROR_CODES.INVALID_LOGIN_CREDENTIALS,
    },
  ],
  [
    'INTERNAL_SERVER_ERROR',
    {
      message: 'Something went wrong, please try again later',
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    },
  ],
  [
    'INACTIVE_ACCOUNT',
    {
      message: 'Your account is not active',
      code: ERROR_CODES.INACTIVE_ACCOUNT,
    },
  ],
  [
    'UNAUTHORIZED',
    { message: 'Unauthorized access', code: ERROR_CODES.UNAUTHORIZED },
  ],
])
