import { DepartmentCreation } from "@/features/types";

import { DepartmentForm } from "./types";

export class DepartmentFormMapper {
  public static toModel(formData: DepartmentForm): DepartmentCreation {
    return formData;
  }
}
