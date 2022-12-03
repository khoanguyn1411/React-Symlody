import { FormatService } from "@/utils/services";

export class DateMapper {
  public static fromDto(dto: string | undefined): string {
    return dto ? FormatService.toDateString(dto, "US") : "";
  }

  public static toDto(model: string | null | undefined): string {
    return model ? FormatService.toDateString(model, "API") : undefined;
  }
}
