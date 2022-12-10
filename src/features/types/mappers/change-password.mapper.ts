import { extractErrorMessage } from "@/utils/services/error-handler-service";

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
      error: errorDto.error,
      detail: {
        oldPassword: extractErrorMessage(errorDto.details.old_password),
        newPassword: extractErrorMessage(errorDto.details.new_password),
      },
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
