import { IProfile } from "./profile";

export interface IProperty {
  id: number;
  incharger: IProfile;
  created_by: IProfile;
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
