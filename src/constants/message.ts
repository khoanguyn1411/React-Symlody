export const APP_ERROR_MESSAGE = {
  REQUIRED: "Vui lòng nhập thông tin.",
  EMAIL: "Trường này phải là email.",
  PASSWORD_NOT_MATCH:
    "Trường mật khẩu mới và xác nhận mật khẩu chưa trùng khớp.",
  MAX: (maxCharNumber: number, field?: string) =>
    `${
      field || "Trường này"
    } không được vượt quá ${maxCharNumber.toString()} ký tự.`,
  MAX_NUMBER: (maxValue: number) =>
    `Vui lòng nhập một số nhỏ hơn ${maxValue.toString()}.`,
  MIN_NUMBER: (minValue: number) =>
    `Vui lòng nhập một số lớn hơn ${minValue.toString()}.`,
} as const;
