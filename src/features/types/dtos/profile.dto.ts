import { StrictPick } from "@/utils/types";

import { AuthAccountCreationDto, AuthAccountDto } from "./auth-account.dto";
import { DepartmentDto } from "./department.dto";
import { GenderDto } from "./gender.dto";
import { OrganizationDto } from "./organization.dto";

export interface IProfileDto extends AuthAccountDto {
  id: number;
  gender: GenderDto;
  phone_number: string;
  student_id: string;
  home_town: string;
  dob: string;
  class_name: string;
  avatar: string;
  address: string;
  department: DepartmentDto;
  organization: OrganizationDto;
  profile_id: number;
}

export type IProfileUpdateDto = AuthAccountCreationDto & {
  avatar?: File;
} & StrictPick<
    IProfileDto,
    | "gender"
    | "dob"
    | "class_name"
    | "student_id"
    | "address"
    | "phone_number"
    | "home_town"
  >;
