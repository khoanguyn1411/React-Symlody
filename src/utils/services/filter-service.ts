import { FormatService } from "./format-service";

export class FilterService {
  public static fromText(text: string, includedText: string): boolean {
    return FormatService.toCleanedString(text).includes(
      FormatService.toCleanedString(includedText)
    );
  }
}
