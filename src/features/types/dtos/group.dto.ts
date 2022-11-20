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
  readonly id: number;
  readonly name: ERolesDto;
}

export interface IGroupCreateUpdateDto {
  readonly name: ERolesDto;
}
