import { AuthAccountDto } from "./auth-account.dto";

export interface IConfigInfoDto extends AuthAccountDto {
  id: number;
}

export interface IConfigManagerDto {
  leaders: IConfigInfoDto[];
  managers: IConfigInfoDto[];
}

export interface IConfigUserUpdateDto {
  user_id: number;
  groups: number[];
}
