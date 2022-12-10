import { Department } from "@/features/types";
import { StrictPick } from "@/utils/types";

export type DepartmentForm = StrictPick<
  Department,
  "id" | "abbreviationName" | "name"
>;
