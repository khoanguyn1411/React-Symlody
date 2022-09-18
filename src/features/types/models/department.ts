export interface IDepartment {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
}

// export type IDepartmentCreateUpdate = Omit<
//   IDepartment,
//   "name" | "abbreviation_name"
// >;

export type IDepartmentCreateUpdate = Omit<IDepartment, "abbreviation_name">;
