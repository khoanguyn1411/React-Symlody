import { GlobalTypes } from "@/utils";

export interface Department {
  id: number;
  name: string;
  abbreviationName: string | null;
  memberCount: number;
  createdDate: string;
}

export type DepartmentCreation = GlobalTypes.StrictPick<
  Department,
  "name" | "abbreviationName"
>;
