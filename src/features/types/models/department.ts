import { GlobalTypes } from "@/utils";

export interface IDepartment {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
}

// export type IDepartmentCreateUpdate = GlobalTypes.StrictOmit<
//   IDepartment,
//   "name" | "abbreviation_name"
// >;

export type IDepartmentCreateUpdate = GlobalTypes.StrictOmit<
  IDepartment,
  "abbreviation_name"
>;
