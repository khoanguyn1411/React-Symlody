export enum Roles {
  Member = "Thành viên",
  Lead = "Quản lý chung",
  EventManager = "Quản lý sự kiện",
  MemberManager = "Quản lý thành viên",
  NotificationManager = "Quản lý thông báo",
  PropertyManager = "Quản lý tài sản",
  SystemAdmin = "Quản lý hệ thống",
}

export enum RolesID {
  SystemAdmin = 1,
  Lead = 2,
  MemberManager = 3,
  PropertyManager = 4,
  NotificationManager = 5,
  EventManager = 6,
  Member = 7,
}

export enum RolesManagerSortName {
  MemberManager = "Thành viên",
  PropertyManager = "Tài sản",
}

export const MANAGER_ROLES = [
  Roles.EventManager,
  Roles.MemberManager,
  Roles.NotificationManager,
  Roles.PropertyManager,
];

export interface Group {
  id: number;
  name: Roles;
}
