import { GlobalTypes } from "@/utils";

export interface Department {
  id: number;
  name: string;
  abbreviation_name: string | null;
  member_count: number;
  created_date: string;
}

export type IDepartmentCreateUpdate = GlobalTypes.StrictPick<
  Department,
  "name" | "abbreviation_name"
>;
