export enum ERolesDto {
  SystemAdmin = 1,
  Lead = 2,
  MemberManager = 3,
  PropertyManager = 4,
  NotificationManager = 5,
  EventManager = 6,
  Member = 7,
}

export interface IAuthAccountDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly groups: ERolesDto[];
}

export interface IDepartmentDto {
  readonly id: number;
  readonly name: string;
}

interface IMemberGeneralDto {
  readonly auth_account: IAuthAccountDto;
  readonly gender: number;
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly department: IDepartmentDto;
}

export interface IMemberDto extends IMemberGeneralDto {
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: number;
}

export interface IMemberCreateDto extends IMemberGeneralDto {
  readonly is_archived: boolean;
}
