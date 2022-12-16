/**
 * Check whether elements in array 1 included in array 2.
 * @param arr1 First array.
 * @param arr2 Second array.
 */
export function hasElementOfArray<T extends any[]>(arr1: T, arr2: T): boolean {
  return arr1.some((v) => arr2.includes(v));
}
