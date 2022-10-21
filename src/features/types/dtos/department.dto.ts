import { GlobalTypes } from "@/utils";

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
  readonly name: string;
  readonly abbreviation_name?: string | null;
  // readonly org_departments: IDepartmentDto;
}
