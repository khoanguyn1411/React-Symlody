import { GlobalTypes } from "@/utils";

import { IGroup } from "./group";

export interface IAuthAccount {
  readonly email?: string;
  readonly first_name: string;
  readonly groups: IGroup[];
  readonly last_name: string;
  readonly full_name: string;
}

export type IAuthAccountCreateUpdate = GlobalTypes.StrictOmit<
  IAuthAccount,
  "groups"
>;

export interface IChangePassword {
  readonly old_password: string;
  readonly new_password: string;
  readonly confirm_password: string;
}
