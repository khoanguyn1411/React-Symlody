import { AuthAccountCreationDto, AuthAccountDto } from "./auth-account.dto";
import { DepartmentDto } from "./department.dto";

interface IMemberGeneralDto {
  gender: number;
  class_name: string;
  student_id: string;
  address: string;
  phone_number: string;
  home_town: string;
  dob: string;
  is_archived: boolean;
}

export interface IMemberDto extends IMemberGeneralDto {
  auth_account: AuthAccountDto;
  id: number;
  last_modified_date: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
  avatar: string;
  department: DepartmentDto;
}

export interface IMemberCreateUpdateDto extends IMemberGeneralDto {
  auth_account: AuthAccountCreationDto;
  department_id?: number;
  avatar?: File;
}
