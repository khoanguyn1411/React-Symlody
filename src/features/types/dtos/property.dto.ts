import { GlobalTypes } from "@/utils";

import { IUserDto } from "./user.dto";

export interface IPropertyDto {
  id: number;
  incharger: IUserDto;
  created_by: IUserDto;
  last_modified_by: string | null;
  image: string | null;
  organization: string;
  created_date: string;
  last_modified_date: string;
  archived_date: string;
  is_archived: boolean;
  prop_owner: string;
  name: string;
  price: number;
  quantity: number;
  is_club_property: boolean;
  note: string;
  archived_by: number;
}

export type IPropertyCreateUpdateDto = GlobalTypes.StrictPick<
  IPropertyDto,
  "name" | "quantity" | "price" | "prop_owner" | "note" | "is_club_property"
> & { incharger_id: IUserDto["id"]; image?: File };
