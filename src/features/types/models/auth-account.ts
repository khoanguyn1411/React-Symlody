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
