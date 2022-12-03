import { GlobalTypes } from "@/utils";

export interface IDepartment {
  id: number;
  name: string;
  abbreviation_name: string | null;
  member_count: number;
  created_date: string;
}

export type IDepartmentCreateUpdate = GlobalTypes.StrictPick<
  IDepartment,
  "name" | "abbreviation_name"
>;
