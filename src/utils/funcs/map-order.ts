import { RecordObject } from "../types";

/**
 * Map order by id of object for an array of objects.
 * @param array Array of objects need to be sorted with provided sort order.
 * @param sortOrder Sort order array with id of object.
 * @param key Key name of id.
 */
export function mapOrder<T extends RecordObject>(
  array: T[],
  sortOrder: number[],
  key: keyof T
): T[] {
  array.sort((a, b) => {
    return sortOrder.indexOf(a[key]) - sortOrder.indexOf(b[key]);
  });
  return array;
}
