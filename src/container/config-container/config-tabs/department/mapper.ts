import { IDepartmentCreateUpdate } from "@/features/types";

import { IFormDepartment } from "./types";

export class DepartmentFormMapper {
  /** Use for map data from form values to member model. */
  public static toModel(formData: IFormDepartment): IDepartmentCreateUpdate {
    return {
      ...formData,
    };
  }
}
