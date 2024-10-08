import { FetchDataResponse, FetchOptions } from "@/types/backend"

export const commonFetch = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchDataResponse<T>> => {
  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    if (
      fetchOptions.method &&
      !['GET', 'HEAD'].includes(fetchOptions.method.toUpperCase()) &&
      fetchOptions.body
    ) {
      fetchOptions.body = JSON.stringify(options.body)
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      console.log('>> commonFetch check response:: ', response)
      return {
        data: null,
        error: {
          message: response.statusText,
          code: response.status,
        },
      }
    }

    // Parse dữ liệu JSON từ response
    const data: T = await response.json()
    return { data, error: null }
  } catch (error: unknown) {
    console.error('Fetch error:', error) // Handle non-Error cases
    return { data: null, error: {
      code: 500,
      message: 'An unknown error occurred' 
    }}
  }
}
