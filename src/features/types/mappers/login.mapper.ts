import { LoginDto } from "../dtos";
import { Login } from "../models";

export class LoginMapper {
  public static toDto(model: Login): LoginDto {
    return {
      username: model.username,
      password: model.password,
    };
  }
}
