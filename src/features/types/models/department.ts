import { GlobalTypes } from "@/utils";

export interface IDepartment {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
  //
  readonly member_count?: number;
  readonly created_date?: string;
}

export type IDepartmentCreateUpdate = GlobalTypes.StrictOmit<
  IDepartment,
  "abbreviation_name"
>;
