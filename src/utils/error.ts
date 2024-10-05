import { AuthError } from "next-auth"

export class CustomAuthError extends AuthError {
  static readonly type: string

  constructor(message?: string, errorType: AuthError['type'] = 'UnknownAction') {
    super(message)
    this.type = errorType
  }
}

export class InvalidLoginError extends AuthError {
  static readonly type = 'InvalidLogin'
}

export class InactiveAccountError extends AuthError {
  static readonly type = 'InactiveAccount'
}
