import { toCleanedString } from "./clean-string";

/**
 * Check if current text includes searching text.
 * @param text Current text.
 * @param includedText Text need to be checked whether included in current text or not.
 */
export function isTextIncludedIn(text: string, includedText: string): boolean {
  return toCleanedString(text).includes(toCleanedString(includedText));
}
