import { IUserDto } from "../dtos";
import { IUser } from "../models";

export class UserMapper {
  public static fromDto(dto: IUserDto): IUser {
    return { ...dto };
  }
}
