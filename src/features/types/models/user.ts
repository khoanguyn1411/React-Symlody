import { StrictOmit } from "@/utils/types";

import { AuthAccount } from "./auth-account";
import { Department } from "./department";
import { IsRole } from "./is-role";

export interface User extends StrictOmit<AuthAccount, "groups"> {
  id: number;
  department_id: Department["id"];
  avatar: string | null;
}

export interface UserShort extends AuthAccount, IsRole {
  id: number;
}
