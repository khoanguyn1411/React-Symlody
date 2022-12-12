import { StrictOmit } from "@/utils/types";

import { AuthAccountDto } from "./auth-account.dto";
import { DepartmentDto } from "./department.dto";

export interface UserDto extends StrictOmit<AuthAccountDto, "groups"> {
  id: number;
  department_id: DepartmentDto["id"];
  avatar_url: string | null;
}

export interface UserShortDto extends AuthAccountDto {
  avatar_url: string | null;
  id: number;
}
