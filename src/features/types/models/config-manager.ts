import { IAuthAccount } from "./auth-account";
import { ERoles } from "./group";

export interface IConfigInfo extends IAuthAccount {
  readonly id: number;
  readonly isRole: (role: ERoles | "manager" | "member") => boolean;
}

export interface IConfigManager {
  readonly leaders: IConfigInfo[];
  readonly managers: IConfigInfo[];
}

export interface IConfigUserUpdate {
  readonly user_id: number;
  readonly groups: ERoles[];
}
