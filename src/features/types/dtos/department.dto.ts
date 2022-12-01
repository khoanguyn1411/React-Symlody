import { GlobalTypes } from "@/utils";

import { IGroup } from "./../models/group";

export interface IDepartmentDto {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name: string | null;
  readonly member_count: number;
  readonly created_date: string;
}

export type IDepartmentCreateUpdateDto = GlobalTypes.StrictPick<
  IDepartmentDto,
  "name" | "abbreviation_name"
>;

export type IConfigManagerUpdate = {
  readonly groups: IGroup;
};
