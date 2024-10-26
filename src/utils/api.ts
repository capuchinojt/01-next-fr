import { FetchDataResponse, FetchOptions } from "@/types/backend"

export const sendRequest = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchDataResponse<T>> => {
  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${process.env.NEXT_PUBLIC_BACKEND_TOKEN}`,
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, fetchOptions)

    if (!response.ok) {
      const { errorCode, message } = await response.json()

      return {
        data: null,
        error: {
          message,
          code: errorCode,
        },
        status: response.status,
        statusText: response.statusText
      }
    }

    const data: T = await response.json()
    return {
      data,
      error: null,
      status: response.status,
      statusText: response.statusText,
    }
  } catch (error: unknown) {
    console.error('Fetch error:', error) // Handle non-Error cases
    return { data: null, error: {
      code: 500,
      message: 'An unknown error occurred' 
    }}
  }
}
