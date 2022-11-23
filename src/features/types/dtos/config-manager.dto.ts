import { IAuthAccountDto } from "./auth-account.dto";

export interface IConfigInfoDto extends IAuthAccountDto {
  readonly id: number;
}

export interface IConfigManagerDto {
  readonly leaders: IConfigInfoDto[];
  readonly managers: IConfigInfoDto[];
}

export interface IConfigUserUpdateDto {
  readonly user_id: number;
  readonly groups: number[];
}
