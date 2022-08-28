export enum ERoles {
  Member = "Thành viên",
  Lead = "Trưởng ban",
  EventManager = "Quản lý sự kiện",
  MemberManager = "Quản lý thành viên",
  NotificationManager = "Quản lý thông báo",
  PropertyManager = "Quản lý tài sản",
  SystemAdmin = "Quản lý hệ thống",
}

export interface IAuthAccount {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly groups: string[];
}

export interface IDepartment {
  readonly id: number;
  readonly name: string;
}

interface IMemberGeneral {
  readonly auth_account: IAuthAccount;
  readonly gender: "Nam" | "Nữ";
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly department: IDepartment;
}

export interface IMember extends IMemberGeneral {
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: number;
}

export interface IMemberCreate extends IMemberGeneral {
  readonly is_archived: boolean;
}
