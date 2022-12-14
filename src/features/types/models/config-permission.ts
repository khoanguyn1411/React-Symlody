import { Roles } from "./group";
import { UserShort } from "./user";

export interface LeadersAndManagers {
  leaders: UserShort[];
  managers: UserShort[];
}

export interface UserPermissionConfigCreation {
  groups: Roles[];
}
