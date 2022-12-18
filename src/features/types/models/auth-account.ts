import { StrictOmit } from "@/utils/types";

import { Group } from "./group";

export interface AuthAccount {
  email?: string;
  firstName: string;
  groups: Group[];
  lastName: string;
  fullName: string;
}

export type AuthAccountCreation = StrictOmit<
  AuthAccount,
  "groups" | "fullName"
>;
