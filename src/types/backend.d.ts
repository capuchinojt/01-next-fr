export interface FetchDataResponse<T> {
  data: T | null
  error: {
    code: number
    message: string
  } | null
  status?: number
  statusText?: string
}

export interface FetchOptions {
  headers?: { [key: string]: string }
  body?: any
  method?: string
}

interface SignInResponse {
  user: IUser
  accessToken: string | null
  error: string | null
  code: number
}

interface IUser {
  _id?: string
  name?: string
  email?: string
  isActive?: boolean
  role?: string
  avatar?: string
}

interface ISession {
  user: IUser
  expires: string
}
