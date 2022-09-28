import { IDepartmentCreateUpdateDto, IDepartmentDto } from "./department.dto";
import { ERolesDto } from "./group.dto";

interface IMemberGeneralDto {
  readonly gender: number;
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly is_archived: boolean;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly groups: ERolesDto[];
}

export interface IMemberDto extends IMemberGeneralDto {
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: number;
  readonly department: IDepartmentDto;
}

export interface IMemberCreateUpdateDto extends IMemberGeneralDto {
  readonly department: IDepartmentCreateUpdateDto;
}
