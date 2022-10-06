export enum ERoles {
  Member = "Thành viên",
  Lead = "Trưởng ban",
  EventManager = "Quản lý sự kiện",
  MemberManager = "Quản lý thành viên",
  NotificationManager = "Quản lý thông báo",
  PropertyManager = "Quản lý tài sản",
  SystemAdmin = "Quản lý hệ thống",
}

export enum ERolesID {
  SystemAdmin = 1,
  Lead = 2,
  MemberManager = 3,
  PropertyManager = 4,
  NotificationManager = 5,
  EventManager = 6,
  Member = 7,
}

export interface IGroup {
  readonly id: number;
  readonly name: string;
}
