import { IDepartmentDto } from "./department.dto";
import { IGroupDto } from "./group.dto";
import { ITenantDto } from "./tenant.dto";

export interface IProfileDto {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly gender: number;
  readonly phone_number: string;
  readonly student_id: string;
  readonly home_town: string;
  readonly dob: string;
  readonly class_name: string;
  readonly avatar: string;
  readonly address: string;
  readonly department: IDepartmentDto;
  readonly groups: IGroupDto[];
  readonly organization: ITenantDto;
}
