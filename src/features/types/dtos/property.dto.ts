import { GlobalTypes } from "@/utils";

import { IUserDto } from "./user.dto";

export interface IPropertyDto {
  readonly id: number;
  readonly incharger: IUserDto;
  readonly created_by: IUserDto;
  readonly last_modified_by: string | null;
  readonly image: string | null;
  readonly organization: string;
  readonly created_date: string;
  readonly last_modified_date: string;
  readonly archived_date: string;
  readonly is_archived: boolean;
  readonly prop_owner: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly is_club_property: boolean;
  readonly note: string;
  readonly archived_by: number;
}

export type IPropertyCreateUpdateDto = GlobalTypes.StrictPick<
  IPropertyDto,
  "name" | "quantity" | "price" | "prop_owner" | "note" | "is_club_property"
> & { incharger_id: IUserDto["id"]; image?: File };
