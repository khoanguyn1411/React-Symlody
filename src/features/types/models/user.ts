import { StrictOmit } from "@/utils/types";

import { AuthAccount } from "./auth-account";
import { Department } from "./department";

export interface User extends StrictOmit<AuthAccount, "groups"> {
  id: number;
  department_id: Department["id"];
  avatar: string | null;
}
