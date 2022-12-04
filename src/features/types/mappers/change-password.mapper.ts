import { ChangePasswordDto } from "../dtos/change-password.dto";
import { ChangePassword } from "../models/change-password";

export class ChangePasswordMapper {
  public static toDto(model: ChangePassword): ChangePasswordDto {
    return {
      old_password: model.oldPassword,
      new_password: model.newPassword,
    };
  }
}
