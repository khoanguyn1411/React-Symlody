import { ErrorHandler } from "@/utils/funcs/error-handler";

import { HttpErrorDto, LoginDto } from "../dtos";
import { HttpError, Login } from "../models";
import { IMapperToDto, IMapperToHttpError } from "./base-mappers/mapper";

export class LoginMapper
  implements IMapperToDto<LoginDto, Login>, IMapperToHttpError<LoginDto, Login>
{
  public httpErrorFromDto(errorDto: HttpErrorDto<LoginDto>): HttpError<Login> {
    return {
      email: ErrorHandler.extractErrorMessage(errorDto.username),
      password:
        ErrorHandler.extractErrorMessage(errorDto.password) ??
        ErrorHandler.extractErrorMessage(errorDto.non_field_errors),
    };
  }
  public toDto(model: Login): LoginDto {
    return {
      username: model.email,
      password: model.password,
    };
  }
}

export const loginMapper = new LoginMapper();
