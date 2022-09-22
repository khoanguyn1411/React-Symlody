import { GeneratorService } from "@/utils";

import { IProfileDto } from "../dtos";
import { IProfile } from "../models";

export class ProfileMapper {
  public static fromDto(dto: IProfileDto): IProfile {
    return {
      ...dto,
      full_name: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
    };
  }

  public static toDto(model: IProfile): IProfileDto {
    return { ...model };
  }
}
