import { StrictOmit } from "@/utils/types";

import { AuthAccountDto } from "./auth-account.dto";
import { DepartmentDto } from "./department.dto";

export interface UserDto extends StrictOmit<AuthAccountDto, "groups"> {
  id: number;
  department_id: DepartmentDto["id"];
  avatar: string | null;
}
