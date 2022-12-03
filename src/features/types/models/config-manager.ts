import { IAuthAccount } from "./auth-account";
import { ERoles } from "./group";

export interface IConfigInfo extends IAuthAccount {
  id: number;
  isRole: (role: ERoles | "manager" | "member") => boolean;
}

export interface IConfigManager {
  leaders: IConfigInfo[];
  managers: IConfigInfo[];
}

export interface IConfigUserUpdate {
  user_id: number;
  groups: ERoles[];
}
