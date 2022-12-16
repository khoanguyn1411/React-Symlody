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
