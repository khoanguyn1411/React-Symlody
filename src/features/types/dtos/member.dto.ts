import { StrictOmit, StrictPick } from "@/utils/types";

import { AuthAccountCreationDto, AuthAccountDto } from "./auth-account.dto";
import { DepartmentDto } from "./department.dto";

export interface MemberDto {
  auth_account: AuthAccountDto;
  id: number;
  last_modified_date: string;
  created_by: StrictPick<AuthAccountDto, "first_name" | "last_name">;
  avatar_url: string;
  department: DepartmentDto;

  gender: number;
  class_name: string;
  student_id: string;
  address: string;
  phone_number: string;
  home_town: string;
  dob: string;
  is_archived: boolean;
}

export type MemberCreationDto = StrictOmit<
  MemberDto,
  | "auth_account"
  | "department"
  | "avatar_url"
  | "id"
  | "last_modified_date"
  | "created_by"
> & {
  auth_account: AuthAccountCreationDto;
  department_id?: number;
  avatar?: File;
};
