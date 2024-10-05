export interface FetchDataResponse<T> {
  data: T | null;
  error: string | null;
}

export const commonFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<FetchDataResponse<T>> => {
  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers, // Thêm các headers tùy chỉnh nếu có
      },
    };

    console.log('>> check fetchOptions:: ', fetchOptions)

    // Kiểm tra nếu có body và method không phải là GET hoặc HEAD
    if (fetchOptions.method && !['GET', 'HEAD'].includes(fetchOptions.method.toUpperCase()) && fetchOptions.body) {
      fetchOptions.body = JSON.stringify(options.body); // Chuyển body thành JSON nếu có
    }

    console.log('>> check fetchOptions after:: ', fetchOptions)
    // Gọi fetch API
    const response = await fetch(url, fetchOptions);

    console.log('>> check response:: ', response)

    // Nếu request không thành công, ném lỗi
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse dữ liệu JSON từ response
    const data: T = await response.json();
    console.log('>> check data:: ', data)
    return { data, error: null };

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
      return { data: null, error: error.message };
    }
    console.error('Fetch error:', error); // Handle non-Error cases
    return { data: null, error: 'An unknown error occurred' };
  }
};
