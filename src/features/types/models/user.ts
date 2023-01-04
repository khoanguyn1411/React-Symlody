import { StrictOmit } from "@/utils/types";

import { AuthAccount } from "./auth-account";
import { Department } from "./department";

export interface User extends StrictOmit<AuthAccount, "groups"> {
  id: number;
  departmentId: Department["id"];
  avatarUrl: string | null;
}

export interface UserShort extends AuthAccount {
  avatarUrl: string | null;
  id: number;
}
