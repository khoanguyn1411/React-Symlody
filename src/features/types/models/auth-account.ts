import { GlobalTypes } from "@/utils";

import { Group } from "./group";

export interface AuthAccount {
  email?: string;
  firstName: string;
  groups: Group[];
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
