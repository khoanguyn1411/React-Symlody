export enum RolesDto {
  SystemAdmin = "system_admin",
  Lead = "lead",
  MemberManager = "member_manager",
  PropertyManager = "property_manager",
  NotificationManager = "notification_manager",
  EventManager = "event_manager",
  Member = "member",
}
export interface GroupDto {
  id: number;
  name: RolesDto;
}
