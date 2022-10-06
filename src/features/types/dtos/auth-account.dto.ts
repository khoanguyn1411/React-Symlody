import { IGroupCreateUpdateDto, IGroupDto } from "./group.dto";

export interface IAuthAccountDto {
  readonly email: string;
  readonly first_name: string;
  readonly groups: IGroupDto[] | IGroupCreateUpdateDto[];
  readonly last_name: string;
}
