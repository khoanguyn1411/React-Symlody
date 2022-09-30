import { toCleanedString } from "./format-service";

export function fromText(text: string, includedText: string): boolean {
  return toCleanedString(text).includes(toCleanedString(includedText));
}
