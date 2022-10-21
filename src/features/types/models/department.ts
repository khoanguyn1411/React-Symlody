import { GlobalTypes } from "@/utils";

export interface IDepartment {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
  //
  readonly number_user?: number;
  readonly createdAt?: string;
}

export type IDepartmentCreateUpdate = GlobalTypes.StrictOmit<
  IDepartment,
  "abbreviation_name"
>;
