import { CommonFilterParams } from "./common-filter-params";

export interface MemberFilterParams extends CommonFilterParams.Combined {
  isArchived: boolean;
}
