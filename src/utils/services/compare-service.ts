import { toDateString } from "./format-service";

export function compareDateWithToday(
  dateStr: string | Date
): "in-past" | "in-future" | "today" {
  const userEntered = new Date(dateStr);
  const today = new Date();
  if (toDateString(userEntered, "US") === toDateString(today, "US")) {
    return "today";
  }
  if (userEntered.getTime() < today.getTime()) {
    return "in-past";
  }
  return "in-future";
}

/**
 * Check whether elements in array 1 included in array 2.
 * @param arr1 First array.
 * @param arr2 Second array.
 */
export function hasElementOfArray(arr1: any[], arr2: any[]): boolean {
  return arr1.some((v) => arr2.includes(v));
}
