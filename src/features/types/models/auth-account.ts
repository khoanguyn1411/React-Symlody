import { GlobalTypes } from "@/utils";

import { IGroup } from "./group";

export interface AuthAccount {
  email?: string;
  firstName: string;
  groups: IGroup[];
  lastName: string;
  fullName: string;
}

export type AuthAccountCreation = GlobalTypes.StrictOmit<
  AuthAccount,
  "groups" | "fullName"
>;

export interface IChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
