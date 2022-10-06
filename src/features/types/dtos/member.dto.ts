import {
  IAuthAccountCreateUpdateDto,
  IAuthAccountDto,
} from "./auth-account.dto";
import { IDepartmentCreateUpdateDto, IDepartmentDto } from "./department.dto";

interface IMemberGeneralDto {
  readonly gender: number;
  readonly class_name: string;
  readonly student_id: string;
  readonly avatar: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly is_archived: boolean;
}

export interface IMemberDto extends IMemberGeneralDto {
  readonly auth_account: IAuthAccountDto;
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: {
    readonly first_name: string;
    readonly last_name: string;
  };
  readonly department: IDepartmentDto;
}

export interface IMemberCreateUpdateDto extends IMemberGeneralDto {
  readonly auth_account: IAuthAccountCreateUpdateDto;
  readonly department: IDepartmentCreateUpdateDto;
}
