import { AuthError } from 'next-auth'

import { ErrorExpendCustomType, getErrorKeyByCode } from '@/types/error.type'

export class CustomAuthError extends AuthError {
  static readonly type: ErrorExpendCustomType | undefined

  constructor(error?: ErrorExpendCustomType, code?: number) {
    super(error);

    // Nếu mã lỗi được cung cấp, lấy key từ mã lỗi
    if (code !== undefined) {
      const errorType = getErrorKeyByCode(code);

      // Kiểm tra nếu errorType tồn tại và là một giá trị hợp lệ trước khi gán cho this.type
      if (errorType) {
        this.type = errorType as ErrorExpendCustomType;
      } else {
        // Nếu không tìm thấy errorType, xử lý theo cách khác, ví dụ gán giá trị mặc định
        this.type = 'UNKNOWN_ERROR' as ErrorExpendCustomType;
      }
    } else {
      // Nếu không có mã lỗi, sử dụng giá trị của error (nếu có)
      this.type = error ?? ({} as ErrorExpendCustomType); // Assign an empty object if error is undefined
    }
  }
}
