import { CommonFilterParams } from "./common-filter-params";

export interface PropertyFilterParams extends CommonFilterParams.Combined {
  isArchived: boolean;
}
