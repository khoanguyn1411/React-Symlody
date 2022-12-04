import { GlobalTypes } from "@/utils";

export interface DepartmentDto {
  id: number;
  name: string;
  abbreviation_name: string | null;
  member_count: number;
  created_date: string;
}

export type DepartmentCreationDto = GlobalTypes.StrictPick<
  DepartmentDto,
  "name" | "abbreviation_name"
>;
