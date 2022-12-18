import { AuthAccountCreationDto, AuthAccountDto } from "./auth-account.dto";
import { DepartmentDto } from "./department.dto";
import { GenderDto } from "./gender.dto";
import { OrganizationDto } from "./organization.dto";

export interface ProfileDto extends AuthAccountDto {
  id: number;
  gender: GenderDto;
  phone_number: string;
  student_id: string;
  home_town: string;
  dob: string;
  class_name: string;
  avatar_url: string;
  address: string;
  department: DepartmentDto;
  organization: OrganizationDto;
  profile_id: number;
}

export type ProfileCreationDto = AuthAccountCreationDto & {
  avatar: File;
} & Pick<
    ProfileDto,
    | "gender"
    | "dob"
    | "class_name"
    | "student_id"
    | "address"
    | "phone_number"
    | "home_town"
  >;
