import { ERolesDto } from "./group.dto";

export interface IAuthAccountDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly groups: ERolesDto[];
}
