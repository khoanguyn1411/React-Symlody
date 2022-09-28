import { toNumber } from "./format-service";

export function generateStatusMessageFor(entity: string): {
  readonly [key in string]: {
    readonly success: string;
    readonly error: string;
  };
} {
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
  };
}
export function generateFullName(lastName: string, firstName: string): string {
  return `${lastName} ${firstName}`;
}

export function generateReverseDto<
  Model extends string | number | symbol,
  Dto extends string | number | symbol
>(
  model: Readonly<Record<Dto, Model>>,
  isNumberModel = false
): Readonly<Record<Model, Dto>> {
  let obj: Readonly<Record<Model, Dto>>;
  Object.entries(model).forEach(([key, value]) => {
    obj = {
      ...obj,
      [value as Dto]: !isNumberModel ? (key as Model) : toNumber(key),
    };
  });
  return obj;
}

export function generateArrayWithNoDuplicate<T>(arr: T[]) {
  const s = new Set(arr);
  const it = s.values();
  return Array.from(it);
}
