import { UserShortDto } from "./user.dto";

export interface LeadersAndManagersDto {
  leaders: UserShortDto[];
  managers: UserShortDto[];
}

export interface UserPermissionConfigCreationDto {
  groups: number[];
}
