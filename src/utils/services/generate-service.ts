import { toNumber } from "./format-service";

type TStatusMessage = "update" | "achieve" | "create" | "delete";
/**
 * Generate messages for an specific entity.
 * @param entity Entity of message.
 */
export function generateStatusMessageFor(entity: string): {
  readonly [key in TStatusMessage]: {
    readonly success: string;
    readonly error: string;
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

/**
 * Generate full name.
 * @param lastName Last name.
 * @param firstName First name.
 */
export function generateFullName(lastName: string, firstName: string): string {
  return `${lastName} ${firstName}`;
}

/**
 * Generate an reverse version from dto.
 * @param model Model of entity.
 * @param isNumberModel Whether model is number or not.
 */
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

/**
 * Generate an array with no duplicate entity.
 * @param arr Root array to generate.
 */
export function generateArrayWithNoDuplicate<T>(arr: T[]): T[] {
  const s = new Set(arr);
  const it = s.values();
  return Array.from(it);
}

/**
 * Generate placeholder for empty value.
 * @param input Input value.
 */
export function generatePlaceholderEmptyValue(input: any): any {
  if (!input) {
    return "-";
  }
  return input;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type NonFunctional<T> = T extends Function ? never : T;

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function generateArrayFromEnum<T extends Record<string, unknown>>(
  enumeration: T
): NonFunctional<T[keyof T]>[] {
  return Object.keys(enumeration)
    .filter((key) => isNaN(Number(key)))
    .map((key) => enumeration[key])
    .filter(
      (val): val is NonFunctional<T[keyof T]> =>
        typeof val === "number" || typeof val === "string"
    );
}

/**
 * Generate readable error from an array of errors.
 * @param errorArr Array of errors.
 * @param mapper Mapper method to map error to readable text.
 */
export function generateErrorMessageFromErrorArray(
  errorArr: string[],
  mapper: Readonly<Record<string, string>>
): string {
  if (!Array.isArray(errorArr)) {
    throw new Error(
      "`generateErrorMessageFromErrorArray` error: Please provide an array, not an object."
    );
  }
  return errorArr
    .reduce((acc: string[], cur) => {
      if (mapper[cur] != null) {
        return [...acc, mapper[cur]];
      }
      return acc;
    }, [])
    .join(", ");
}
