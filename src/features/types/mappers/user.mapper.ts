import { GeneratorService } from "@/utils";

import { IUserDto } from "../dtos";
import { IUser } from "../models";

export class UserMapper {
  public static fromDto(dto: IUserDto): IUser {
    return {
      ...dto,
      full_name: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
    };
  }

  public static toDto(model: IUser): IUserDto {
    return { ...model };
  }
}
