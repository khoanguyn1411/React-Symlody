/**
 * Generate an array with no duplicate entity.
 * @param arr Root array to generate.
 */
export function generateArrayWithNoDuplicate<T>(arr: T[]): T[] {
  const s = new Set(arr);
  const it = s.values();
  return Array.from(it);
}
