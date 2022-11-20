import { IAuthAccount } from "./auth-account";
import { ERoles } from "./group";

export interface IConfigInfo extends IAuthAccount {
  readonly id: number;
  readonly isRole: (role: ERoles) => boolean;
}

export interface IConfigManager {
  readonly leaders: IConfigInfo[];
  readonly managers: IConfigInfo[];
}
