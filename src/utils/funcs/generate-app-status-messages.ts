type TStatusMessage = "update" | "achieve" | "create" | "delete";
/**
 * Generate messages for an specific entity.
 * @param entity Entity of message.
 */
export function generateStatusMessageFor(entity: string): {
  [key in TStatusMessage]: {
    success: string;
    error: string;
  };
} {
  return {
    delete: {
      success: `Xóa ${entity} thành công.`,
      error: `Xóa ${entity} thất bại.`,
    },
    achieve: {
      success: `Lưu trữ ${entity} thành công.`,
      error: `Lưu trữ ${entity} thất bại.`,
    },
    create: {
      error: `Tạo ${entity} thất bại.`,
      success: `Tạo ${entity} thành công.`,
    },
    update: {
      error: `Cập nhật ${entity} thất bại.`,
      success: `Cập nhật ${entity} thành công.`,
    },
  };
}
