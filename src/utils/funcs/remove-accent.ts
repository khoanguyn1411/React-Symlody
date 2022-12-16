/**
 * Remove accents from text.
 * @param str Text need to remove accents.
 */
export function removeAccent(str: string): string {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return str;
}
