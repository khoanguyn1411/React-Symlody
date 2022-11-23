import { IAuthAccountDto } from "./auth-account.dto";
import { IDepartmentDto } from "./department.dto";
import { ITenantDto } from "./tenant.dto";

export interface IProfileDto extends IAuthAccountDto {
  readonly id: number;
  readonly gender: number;
  readonly phone_number: string;
  readonly student_id: string;
  readonly home_town: string;
  readonly dob: string;
  readonly class_name: string;
  readonly avatar: string;
  readonly address: string;
  readonly department: IDepartmentDto;
  readonly organization: ITenantDto;
  readonly profile_id: number;
}
