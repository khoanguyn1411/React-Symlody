export class GeneratorService {
  public static generateStatusMessageFor(entity: string) {
    return {
      delete: {
        success: `Xóa ${entity} thành công.`,
        error: `Xóa ${entity} thất bại.`,
      },
      create: {
        error: `Tạo ${entity} thất bại.`,
        success: `Tạo ${entity} thành công.`,
      },
      update: {
        error: `Cập nhật ${entity} thất bại.`,
        success: `Cập nhật ${entity} thành công.`,
      },
    } as const;
  }
}
