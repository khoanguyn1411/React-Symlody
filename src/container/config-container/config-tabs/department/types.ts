import { IDepartment } from "@/features/types";
import { StrictPick } from "@/utils/types";

export type IFormDepartment = StrictPick<
  IDepartment,
  "id" | "abbreviation_name" | "name"
>;
