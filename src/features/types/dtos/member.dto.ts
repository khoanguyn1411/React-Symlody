import { GlobalTypes } from "@/types";

import { IAuthAccountDto } from "./auth-account.dto";
import { IDepartmentCreateUpdateDto, IDepartmentDto } from "./department.dto";

interface IMemberGeneralDto {
  readonly auth_account: IAuthAccountDto;
  readonly gender: number;
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly is_archived: boolean;
}

export interface IMemberDto extends IMemberGeneralDto {
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: number;
  readonly department: IDepartmentDto;
}

export interface IMemberCreateDto extends IMemberGeneralDto {
  readonly department: IDepartmentCreateUpdateDto;
}

export type IMemberUpdateDto = IMemberCreateDto;
