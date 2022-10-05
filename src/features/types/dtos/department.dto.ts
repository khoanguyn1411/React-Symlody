import { GlobalTypes } from "@/utils";

export interface IDepartmentDto {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
}

// export type IDepartmentCreateUpdateDto = GlobalTypes.StrictOmit<
//   IDepartmentDto,
//   "name" | "abbreviation_name"
// >;

export type IDepartmentCreateUpdateDto = GlobalTypes.StrictOmit<
  IDepartmentDto,
  "abbreviation_name"
>;
export interface ITenantDto {
  readonly name: string;
  readonly abbreviation_name?: string | null;
  readonly org_departments: IDepartmentDto;
}
