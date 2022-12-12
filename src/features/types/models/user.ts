import { StrictOmit } from "@/utils/types";

import { AuthAccount } from "./auth-account";
import { Department } from "./department";
import { IsRole } from "./is-role";

export interface User extends StrictOmit<AuthAccount, "groups"> {
  id: number;
  departmentId: Department["id"];
  avatarUrl: string | null;
}

export interface UserShort extends AuthAccount, IsRole {
  avatarUrl: string | null;
  id: number;
}
