import { GlobalTypes } from "@/utils";

import { IGroupDto } from "./group.dto";

export interface IAuthAccountDto {
  email?: string;
  first_name: string;
  groups: IGroupDto[];
  last_name: string;
}

export type IAuthAccountCreateUpdateDto = GlobalTypes.StrictOmit<
  IAuthAccountDto,
  "groups"
>;
