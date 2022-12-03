import { GlobalTypes } from "@/utils";

import { IGroup } from "./group";

export interface IAuthAccount {
  email?: string;
  first_name: string;
  groups: IGroup[];
  last_name: string;
  full_name: string;
}

export type IAuthAccountCreateUpdate = GlobalTypes.StrictOmit<
  IAuthAccount,
  "groups" | "full_name"
>;

export interface IChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
