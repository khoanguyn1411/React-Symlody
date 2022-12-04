import { FormatService } from "@/utils/services";

export class DateMapper {
  public fromDto(dto: string | undefined): string {
    return dto ? FormatService.toDateString(dto, "US") : "";
  }

  public toDto(model: string | null | undefined): string {
    return model ? FormatService.toDateString(model, "API") : undefined;
  }
}

export const dateMapper = new DateMapper();
