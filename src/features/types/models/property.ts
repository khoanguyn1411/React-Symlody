import { StrictPick } from "@/utils/types";

import { User } from "./user";

export interface IProperty {
  id: number;
  incharger: User;
  created_by: User;
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
> & { incharger_id: User["id"]; image?: File };
