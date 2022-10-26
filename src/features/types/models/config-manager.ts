import { IGroup } from "./group";

export interface IConfigInfo {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  groups: IGroup[];
}

export interface IConfigManager {
  leaders: IConfigInfo[];
  managers: IConfigInfo[];
}
