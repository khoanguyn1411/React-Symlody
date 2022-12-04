import { ChangePasswordDto } from "../dtos/change-password.dto";
import { ChangePassword } from "../models/change-password";
import { IMapperToDto } from "./base-mappers/mapper";

export class ChangePasswordMapper
  implements IMapperToDto<ChangePasswordDto, ChangePassword>
{
  public toDto(model: ChangePassword): ChangePasswordDto {
    return {
      old_password: model.oldPassword,
      new_password: model.newPassword,
    };
  }
}
export const changePasswordMapper = new ChangePasswordMapper();
