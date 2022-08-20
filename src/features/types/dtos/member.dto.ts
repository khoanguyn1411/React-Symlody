export enum ERolesDto {
  EventManager = 1,
  Member = 2,
  MemberManager = 3,
  NotificationManager = 4,
  PropertyManager = 5,
  SystemAdmin = 6,
  Lead = 7,
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

export type IDepartmentDtoCU = Omit<IDepartmentDto, "id">;

export interface IMemberDto {
  readonly id: number;
  readonly auth_account: IAuthAccountDto;
  readonly gender: number;
  readonly dob: string;
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly last_modified_date: string;
  readonly created_by: number;
  readonly department: IDepartmentDto;
}

export type IMemberDtoCU = Omit<
  IMemberDto,
  "id" | "last_modified_date" | "department"
> & {
  readonly is_archived: boolean;
  readonly department: IDepartmentDtoCU;
  readonly last_modified_by: string;
};
