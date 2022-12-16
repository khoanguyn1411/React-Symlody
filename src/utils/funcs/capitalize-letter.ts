/**
 * Capitalize first letter of a string.
 * @param string String need to be capitalized letter.
 * @param index Index of character need to capitalize (default is 0).
 */
export function capitalizeLetter(string: string, index = 0): string {
  return string.charAt(index).toUpperCase() + string.slice(index + 1);
}
