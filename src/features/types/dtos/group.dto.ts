export enum ERolesDto {
  SystemAdmin = "system_admin",
  Lead = "lead",
  MemberManager = "member_manager",
  PropertyManager = "property_manager",
  NotificationManager = "notification_manager",
  EventManager = "event_manager",
  Member = "member",
}
export interface IGroupDto {
  id: number;
  name: ERolesDto;
}

export interface IGroupCreateUpdateDto {
  name: ERolesDto;
}
