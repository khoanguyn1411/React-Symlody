import { removeAccent } from "./remove-accent";

/**
 * Clean text (remove accents, lowercase and trim).
 * @param value Text need to be cleaned.
 */
export function toCleanedString(value: string): string {
  return removeAccent(value).toLowerCase().trim();
}
