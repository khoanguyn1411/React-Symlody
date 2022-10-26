import { GlobalTypes } from "@/utils";

import { IGroup } from "./../models/group";

export interface IDepartmentDto {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
  //
  readonly number_user?: number;
  readonly createdAt?: string;
}

export type IDepartmentCreateUpdateDto = GlobalTypes.StrictOmit<
  IDepartmentDto,
  "abbreviation_name"
>;
export interface ITenantDto {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
  // readonly org_departments: IDepartment;
  //
  readonly email?: string;
  readonly phone_number?: string;
  readonly school?: string;
  readonly address?: string;
  readonly logo?: string;
}

export type ITenantCreateUpdateDto = GlobalTypes.StrictOmit<ITenantDto, "id">;

export type IConfigManagerUpdate = {
  groups: IGroup;
};
