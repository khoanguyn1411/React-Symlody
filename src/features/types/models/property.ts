import { StrictPick } from "@/utils/types";

import { IUser } from "./user";

export interface IProperty {
  id: number;
  incharger: IUser;
  created_by: IUser;
  last_modified_by: string | null;
  image: string | null;
  organization: string;
  created_date: string;
  last_modified_date: string;
  archived_date: string;
  is_archived: boolean;
  prop_owner: string;
  name: string;
  price: string;
  quantity: string;
  is_club_property: boolean;
  note: string;
  archived_by: number;
}

export type IPropertyCreateUpdate = StrictPick<
  IProperty,
  "name" | "quantity" | "price" | "prop_owner" | "note" | "is_club_property"
> & { incharger_id: IUser["id"]; image?: File };
