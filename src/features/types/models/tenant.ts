import { IDepartment } from "./department";

export interface ITenant {
  readonly name: string;
  readonly abbreviation_name?: string | null;
  readonly org_departments: IDepartment;
  //
  readonly email?: string;
  readonly phone?: string;
  readonly schoolBelonged?: string;
  readonly address?: string;
}
