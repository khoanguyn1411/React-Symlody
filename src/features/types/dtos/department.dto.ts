export interface IDepartmentDto {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
}

// export type IDepartmentCreateUpdateDto = Omit<
//   IDepartmentDto,
//   "name" | "abbreviation_name"
// >;

export type IDepartmentCreateUpdateDto = Omit<
  IDepartmentDto,
  "abbreviation_name"
>;
