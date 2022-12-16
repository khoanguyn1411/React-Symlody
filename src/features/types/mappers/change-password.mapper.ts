import { ErrorHandler } from "@/utils/funcs/error-handler";

import { HttpErrorDto } from "../dtos";
import { ChangePasswordDto } from "../dtos/change-password.dto";
import { HttpError } from "../models";
import { ChangePassword } from "../models/change-password";
import { IMapperToDto, IMapperToHttpError } from "./base-mappers/mapper";

export class ChangePasswordMapper
  implements
    IMapperToDto<ChangePasswordDto, ChangePassword>,
    IMapperToHttpError<ChangePasswordDto, ChangePassword>
{
  public httpErrorFromDto(
    errorDto: HttpErrorDto<ChangePasswordDto>
  ): HttpError<ChangePassword, undefined> {
    return {
      oldPassword:
        ErrorHandler.extractErrorMessage(errorDto.old_password) ??
        ErrorHandler.extractErrorMessage(errorDto.non_field_errors),
      newPassword: ErrorHandler.extractErrorMessage(errorDto.new_password),
    };
  }
  public toDto(model: ChangePassword): ChangePasswordDto {
    return {
      old_password: model.oldPassword,
      new_password: model.newPassword,
    };
  }
}
export const changePasswordMapper = new ChangePasswordMapper();
