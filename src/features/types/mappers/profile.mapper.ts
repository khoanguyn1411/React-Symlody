import { IProfileDto } from "../dtos";
import { IProfile } from "../models";

export class ProfileMapper {
  public static fromDto(dto: IProfileDto): IProfile {
    return { ...dto };
  }

  public static toDto(model: IProfile): IProfileDto {
    return { ...model };
  }
}
