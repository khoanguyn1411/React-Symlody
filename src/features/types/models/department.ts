export interface Department {
  id: number;
  name: string;
  abbreviationName: string | null;
  memberCount: number;
  createdDate: string;
}

export type DepartmentCreation = Pick<Department, "name" | "abbreviationName">;
