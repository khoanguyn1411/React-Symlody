import { StrictPick } from "@/utils/types";

import {
  IAuthAccountCreateUpdateDto,
  IAuthAccountDto,
} from "./auth-account.dto";
import { IDepartmentDto } from "./department.dto";
import { EGenderDto } from "./gender.dto";
import { ITenantDto } from "./tenant.dto";

export interface IProfileDto extends IAuthAccountDto {
  id: number;
  gender: EGenderDto;
  phone_number: string;
  student_id: string;
  home_town: string;
  dob: string;
  class_name: string;
  avatar: string;
  address: string;
  department: IDepartmentDto;
  organization: ITenantDto;
  profile_id: number;
}

export type IProfileUpdateDto = IAuthAccountCreateUpdateDto & {
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
