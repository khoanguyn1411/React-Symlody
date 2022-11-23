import { isObject } from "./common-service";

export function repairFormData<T extends Record<string, any>>(
  entity: T
): FormData {
  const formData = new FormData();
  Object.entries(entity).forEach(([key, value]) => {
    if (value !== undefined) {
      if (isObject(value)) {
        Object.entries(value as Record<string, any>).forEach(
          ([key2, value2]) => {
            const keyName = [key, "[", key2, "]"].join("");
            formData.append(keyName, value2);
          }
        );
        return;
      }
      formData.append(key, value);
    }
  });
  return formData;
}
