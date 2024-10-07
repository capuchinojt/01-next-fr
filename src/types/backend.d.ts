export interface FetchDataResponse<T> {
  data: T | null
  error: {
    code: number,
    message: string
  } | null
}

export interface FetchOptions {
  headers?: { [key: string]: string }
  body?: any
  method?: string
}

interface SignInResponse {
  user: {
    _id: string
    name: string
    email: string
    isActive: boolean,
    role: 'string'
  }
  accessToken: string | null
  error: string | null
  code: number
}
