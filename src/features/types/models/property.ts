import { StrictPick } from "@/utils/types";

import { IUser } from "./user";

export interface IProperty {
  readonly id: number;
  readonly incharger: IUser;
  readonly created_by: IUser;
  readonly last_modified_by: string | null;
  readonly image: string | null;
  readonly organization: string;
  readonly created_date: string;
  readonly last_modified_date: string;
  readonly archived_date: string;
  readonly is_archived: boolean;
  readonly prop_owner: string;
  readonly name: string;
  readonly price: string;
  readonly quantity: string;
  readonly is_club_property: boolean;
  readonly note: string;
  readonly archived_by: number;
}

export type IPropertyCreateUpdate = StrictPick<
  IProperty,
  "name" | "quantity" | "price" | "prop_owner" | "note" | "is_club_property"
> & { incharger_id: IUser["id"]; image?: File };
