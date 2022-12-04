import { LoginDto } from "../dtos";
import { Login } from "../models";
import { IMapperToDto } from "./base-mappers/mapper";

export class LoginMapper implements IMapperToDto<LoginDto, Login> {
  public toDto(model: Login): LoginDto {
    return {
      username: model.username,
      password: model.password,
    };
  }
}

export const loginMapper = new LoginMapper();
