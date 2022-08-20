export enum ERoles {
  EventManager = "Quản lý sự kiện",
  Member = "Thành viên",
  MemberManager = "Quản lý thành viên",
  NotificationManager = "Quản lý thông báo",
  PropertyManager = "Quản lý tài sản",
  SystemAdmin = "Quản lý hệ thống",
  Lead = "Trưởng ban",
}

export interface IAuthAccount {
  readonly fistName: string;
  readonly lastName: string;
  readonly email: string;
  readonly groups: string[];
}

export interface IDepartment {
  readonly id: number;
  readonly name: string;
}

export interface IDepartmentCU {
  name: string;
}

export interface IMember {
  readonly id: number;
  readonly authAccount: IAuthAccount;
  readonly gender: string;
  readonly birthday: string;
  readonly className: string;
  readonly studentId: string;
  readonly address: string;
  readonly phone: string;
  readonly home: string;
  readonly lastModifierDate: string;
  readonly createBy: number;
  readonly department: IDepartment;
}
export type IMemberCU = Omit<IMember, "id" | "department"> & {
  readonly department: IDepartmentCU;
};
