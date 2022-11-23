/**
 * Check whether entity is object or not.
 * @param entity Entity that need to be checked.
 */
export function isObject(entity: any): boolean {
  return entity != null && entity.constructor.name === "Object";
}

/**
 * Check whether elements in array 1 included in array 2.
 * @param arr1 First array.
 * @param arr2 Second array.
 */
export function hasElementOfArray<T extends any[]>(arr1: T, arr2: T): boolean {
  return arr1.some((v) => arr2.includes(v));
}
