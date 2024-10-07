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
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LTAyLW5lc3QtYmVnaXQtMTcyNjU1Nzg1NTUxNC5jbHVzdGVyLWEzZ3JqemVrNjVjeGV4NzYyZTRtd3J6bDQ2LmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyODI3MjQ3MSwiZXhwIjoxNzI4Mjc2MDcxfQ.iw5voV7pp5R2yQDhonWYMGFRh7WgiNzN0T9fnfOfUHd5-8s9qYT8M1BGa1-cTL-kWOvJ-1xs9SK2BLczeUTBHdOgly-nC38JSIZwIUT2J7WJ28Jnf-Iked9U3gM_qEA_Oqu62cxVmIl9CZpgi8t8wd950w4V_rW78Tm3a-yzuuT3YfeALMFdjpFlUPHUft0ZR_WuV13wGYqu3ELklbI-Hn8Npp2-zswjEY1ERBf6bfD2Mw0pXJEzVxDVSoPwB6OoD95IIw3c945RGxxuxgYBLlr4jLukR1rtMopx4d_x3J63FcHVAkxm_bnGpqB6WkBZGb12jj4qBe60N2eUPHg4AA',
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
