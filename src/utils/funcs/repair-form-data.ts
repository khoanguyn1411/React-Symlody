import { isObject } from "./is-object";

/**
 * Append key to form data.
 * @param formData Form data to append.
 * @param key Key of entity.
 * @param value Value of corresponding key.
 */
function appendFormWith(formData: FormData, key: string, value: any): void {
  if (value === null) {
    formData.append(key, "");
    return;
  }
  formData.append(key, value);
}

/**
 * Repair form data.
 * @param entity Entity that need form data to append.
 * @param accumulateKey Please do not provide this param, it must only be used for recursive purpose.
 * @returns Form data appended with entity provided.
 */
export function repairFormData<T extends Record<string, any>>(
  entity: T,
  accumulateKey?: string
): FormData {
  const formData = new FormData();
  Object.entries(entity).forEach(([key, value]) => {
    if (value !== undefined) {
      if (isObject(value)) {
        let keyName: string;
        if (accumulateKey) {
          keyName = `${accumulateKey}[${key}]`;
        } else {
          keyName = key;
        }
        repairFormData(value, keyName);
        return;
      }
      appendFormWith(formData, key, value);
      return;
    }
  });
  return formData;
}
