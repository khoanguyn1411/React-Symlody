import { GlobalTypes } from "@/utils";

import { IGroup } from "./../models/group";

export interface IDepartmentDto {
  id: number;
  name: string;
  abbreviation_name: string | null;
  member_count: number;
  created_date: string;
}

export type IDepartmentCreateUpdateDto = GlobalTypes.StrictPick<
  IDepartmentDto,
  "name" | "abbreviation_name"
>;

export type IConfigManagerUpdate = {
  groups: IGroup;
};
