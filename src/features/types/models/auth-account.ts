import { IGroup } from "./group";

export interface IAuthAccount {
  readonly email: string;
  readonly first_name: string;
  readonly groups: IGroup[];
  readonly last_name: string;
  readonly full_name: string;
}
