import { AuthAccount } from "./auth-account";
import { Group, Roles } from "./group";

export interface IConfigInfo extends AuthAccount {
  id: number;
  isRole: (role: Roles | "manager" | "member") => boolean;
}

export interface IConfigManager {
  leaders: IConfigInfo[];
  managers: IConfigInfo[];
}

export interface IConfigUserUpdate {
  user_id: number;
  groups: Roles[];
}

export type IConfigManagerUpdate = {
  groups: Group;
};
