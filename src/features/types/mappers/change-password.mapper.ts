import { IChangePasswordDto } from "../dtos/change-password.dto";
import { IChangePassword } from "../models";

export class ChangePasswordMapper {
  public static toDto(model: IChangePassword): IChangePasswordDto {
    return {
      old_password: model.old_password,
      new_password: model.new_password,
    };
  }
}
