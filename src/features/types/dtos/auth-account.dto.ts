import { GlobalTypes } from "@/utils";

import { IGroupDto } from "./group.dto";

export interface AuthAccountDto {
  email?: string;
  first_name: string;
  groups: IGroupDto[];
  last_name: string;
}

export type AuthAccountCreationDto = GlobalTypes.StrictOmit<
  AuthAccountDto,
  "groups"
>;
