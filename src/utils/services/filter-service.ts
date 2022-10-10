import { toCleanedString } from "./format-service";

/**
 * Check if current text includes searching text.
 * @param text Current text.
 * @param includedText Text need to be checked whether included in current text or not.
 */
export function isTextIncludedIn(text: string, includedText: string): boolean {
  return toCleanedString(text).includes(toCleanedString(includedText));
}

/**
 * Check if element of an array is in another array.
 * @param arr1 Array 1.
 * @param arr2 Array 2.
 */
export function isElementOfAnArrayInAnotherArray(
  arr1: any[],
  arr2: any[]
): boolean {
  return arr1.every((element) => arr2.includes(element));
}
