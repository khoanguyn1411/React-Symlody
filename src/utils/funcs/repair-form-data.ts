import { isObject } from "./is-object";

export function repairFormData<T extends Record<string, any>>(
  entity: T
): FormData {
  const formData = new FormData();
  Object.entries(entity).forEach(([key, value]) => {
    if (value !== undefined) {
      if (isObject(value)) {
        Object.entries(value as Record<string, any>).forEach(
          ([key2, value2]) => {
            if (value2 !== undefined) {
              const keyName = `${key}[${key2}]`;
              formData.append(keyName, value2);
            }
          }
        );
        return;
      }
      formData.append(key, value);
    }
  });
  return formData;
}
