import { Department } from "@/features/types";
import { StrictPick } from "@/utils/types";

export type IFormDepartment = StrictPick<
  Department,
  "id" | "abbreviationName" | "name"
>;
