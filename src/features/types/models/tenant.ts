export interface ITenant {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name?: string | null;
  // readonly org_departments: IDepartment;
  //
  readonly email?: string;
  readonly phone_number?: string;
  readonly school?: string;
  readonly address?: string;
  readonly logo?: string;
}
