import { Department } from "@/features/types";

export type DepartmentForm = Pick<Department, "abbreviationName" | "name">;
