import { IGroup } from "./group";

export interface IConfigInfor {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  groups: IGroup[];
}

export interface IConfigManager {
  leaders: IConfigInfor[];
  managers: IConfigInfor[];
}
