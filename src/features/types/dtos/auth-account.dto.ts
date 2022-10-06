import { GlobalTypes } from "@/utils";

import { IGroupDto } from "./group.dto";

export interface IAuthAccountDto {
  readonly email: string;
  readonly first_name: string;
  readonly groups: IGroupDto[];
  readonly last_name: string;
}

export type IAuthAccountCreateUpdateDto = GlobalTypes.StrictOmit<
  IAuthAccountDto,
  "groups"
>;
