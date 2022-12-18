import { DateService } from "@/utils/funcs/date-service";

export class DateMapper {
  public fromDto(dto: string | undefined): string {
    return dto ? DateService.toFormat(dto, "US") : "";
  }

  public toDto(model: string | null | undefined): string {
    return model ? DateService.toFormat(model, "API") : undefined;
  }
}

export const dateMapper = new DateMapper();
