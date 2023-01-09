export interface HelpDeskDto {
  title: string;
  category: HelpDeskCategoriesDto;
  content: string;
}

export enum HelpDeskCategoriesDto {
  UserGuild = "UG",
  SystemBug = "SB",
  Suggestion = "SG",
  Other = "OT",
}
