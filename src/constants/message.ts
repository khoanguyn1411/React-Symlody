import { FormatService } from "@/utils";

export const APP_ERROR_MESSAGE = {
  REQUIRED: "Vui lòng nhập thông tin",
  EMAIL: "Trường này phải là email",
  MAX: (maxCharNumber: number, field?: string) =>
    `${field || "Trường này"} không được vượt quá ${FormatService.toString(
      maxCharNumber
    )} ký tự`,
  MIN_NUMBER: (minValue: number) =>
    `Vui lòng nhập một số lớn hơn ${FormatService.toString(minValue)}`,
} as const;
