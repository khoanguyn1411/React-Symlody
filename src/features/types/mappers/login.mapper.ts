import { ILoginDto } from "../dtos";
import { ILogin } from "../models";

export class LoginMapper {
  public static toDto(model: ILogin): ILoginDto {
    return { ...model };
  }
}
