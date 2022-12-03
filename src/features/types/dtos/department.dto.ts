import { GlobalTypes } from "@/utils";

import { Group } from "./../models/group";

export interface DepartmentDto {
  id: number;
  name: string;
  abbreviation_name: string | null;
  member_count: number;
  created_date: string;
}

export type IDepartmentCreateUpdateDto = GlobalTypes.StrictPick<
  DepartmentDto,
  "name" | "abbreviation_name"
>;

export type IConfigManagerUpdate = {
  groups: Group;
};
