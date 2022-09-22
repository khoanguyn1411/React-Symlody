import { GlobalTypes } from "@/types";

import { IProfileDto } from "./profile.dto";

export interface IPropertyDto {
  readonly id: number;
  readonly incharger: IProfileDto;
  readonly created_by: IProfileDto;
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
> & { incharger_id: IProfileDto["id"]; image?: FormData };
